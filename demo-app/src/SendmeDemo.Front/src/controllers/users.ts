import { User } from '@/services/api/endpoints/dtos/users';
import { BaseController } from './core/base';
import { Apis, callApi } from '@/services/api';
import { LazyPromiseObservable } from '@zajno/common-mobx/lazy/observable';
import { PromiseCacheObservable } from '@zajno/common-mobx/structures/promiseCache';
import { ILazyPromise } from '@zajno/common/lazy/promise';
import { WorldChanged } from './helpers/events';
import { setTimeoutAsync } from '@zajno/common/async/timeout';
import { transaction } from 'mobx';
import { FlagModel } from '@zajno/common-mobx/viewModels';

export class UserController extends BaseController {

    private readonly _isRefreshing = new FlagModel();

    private readonly _users = new LazyPromiseObservable(async () => {
        const items = await callApi(Apis.Users.GetUsers, null);
        items.forEach(item => this._transactions.updateValueDirectly(item.name, item));
        return items;
    });
    private readonly _transactions = new PromiseCacheObservable((name: string) => callApi(Apis.Users.GetUser, { name }));

    public get users(): ILazyPromise<User[]> { return this._users; }
    public get isRefreshing() { return this._isRefreshing.value; }

    protected onInitialize(): void | Promise<void> {
        this.disposer.add(
            WorldChanged.on(this.refreshUsers)
        );
    }

    public getInfo(name: string) {
        return this._transactions.getDeferred(name);
    }

    private refreshUsers = async () => {
        if (this._isRefreshing.value) {
            return;
        }

        this._isRefreshing.setTrue();
        const current = this._users.value;

        const getHash = (data: User[]) => JSON.stringify(data);
        const getData = () => callApi(Apis.Users.GetUsers, null);
        const Timeout = 3000;

        const hash = getHash(current);
        let nextData = await getData();

        let repeatTimes = 10;

        try {
            while (getHash(nextData) === hash && repeatTimes-- > 0) {
                await setTimeoutAsync(Timeout);
                nextData = await getData();
            }

            if (repeatTimes > 0) { // not timed out
                transaction(() => {
                    this._users.setInstance(nextData);
                    nextData.forEach(item => this._transactions.updateValueDirectly(item.name, item));
                });
            }

        } finally {
            this._isRefreshing.setFalse();
        }
    };
}
