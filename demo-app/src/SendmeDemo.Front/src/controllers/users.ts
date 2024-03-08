import { User } from '@/services/api/endpoints/dtos/users';
import { BaseController } from './core/base';
import { Apis, callApi } from '@/services/api';
import { LazyPromiseObservable } from '@zajno/common-mobx/lazy/observable';
import { PromiseCacheObservable } from '@zajno/common-mobx/structures/promiseCache';
import { ILazyPromise } from '@zajno/common/lazy/promise';
import { WalletChanged } from './helpers/events';
import { observable, runInAction, transaction } from 'mobx';
import { Nullable } from '@zajno/common/types';
import { refreshData } from './helpers/refresher';

export class UserController extends BaseController {

    private readonly _isRefreshing: Set<string>;

    private readonly _allUsers = new LazyPromiseObservable(async () => {
        const items = await callApi(Apis.Users.GetUsers, null);
        items.forEach(item => this._users.updateValueDirectly(item.name, item));
        return items;
    });
    private readonly _users = new PromiseCacheObservable((name: string) => callApi(Apis.Users.GetUser, { name }));
    private readonly _transactions = new PromiseCacheObservable(async (name: string) => {
        const items = await callApi(Apis.Users.GetTransactions, { name });
        items.forEach(item => {
            item.isOut = item.from === name;
        });
        return items;
    });

    constructor() {
        super();

        this._isRefreshing = observable.set();
    }

    public get users(): ILazyPromise<User[]> { return this._allUsers; }

    protected onInitialize(): void | Promise<void> {
        this.disposer.add(
            WalletChanged.on(async (data) => {
                try {
                    await this.refreshUser(data?.name);
                } catch (e) {
                    this.logger.error('Error refreshing data:', e);
                }
            })
        );
    }

    public getIsRefreshing(name: Nullable<string>) {
        return name ? this._isRefreshing.has(name) : this._isRefreshing.size > 0;
    }

    public getInfo(name: string) {
        return this._users.getDeferred(name);
    }

    public getTransactions(name: string) {
        return this._transactions.getDeferred(name);
    }

    private refreshUser = async (name: Nullable<string>) => {
        if (this.getIsRefreshing(name)) {
            return;
        }

        const current = name
            ? this._users.getCurrent(name, false)
            : (this._allUsers.hasValue
                ? this._allUsers.value
                : null
            );

        const getData = () => name
            ? callApi(Apis.Users.GetUser, { name })
            : callApi(Apis.Users.GetUsers, null);
        const getHash = (data: User | User[]) => Array.isArray(data)
            ? JSON.stringify(data.slice().sort((a, b) => a.name.localeCompare(b.name)))
            : JSON.stringify(data);

        try {
            runInAction(() => {
                this._isRefreshing.add(name || '');
            });

            const result = await refreshData(
                name || '<ALL>',
                current,
                getData,
                getHash,
            );

            if (!result) {
                return;
            }

            transaction(() => {
                if (Array.isArray(result)) {
                    this._allUsers.setInstance(result);
                    result.forEach(item => this._users.updateValueDirectly(item.name, item));
                    this._transactions.keys().forEach(key => this._transactions.invalidate(key));
                } else if (name) {
                    this._users.updateValueDirectly(name, result);
                    this._transactions.invalidate(name);
                    this._allUsers.reset();
                }
            });

        } finally {
            runInAction(() => {
                this._isRefreshing.delete(name || '');
            });
        }
    };
}
