import { BaseController } from './core/base';
import { Apis, callApi } from '@/services/api';
import { LazyPromiseObservable } from '@zajno/common-mobx/lazy/observable';
import { PromiseCacheObservable } from '@zajno/common-mobx/structures/promiseCache';

export class UserController extends BaseController {

    private readonly _users = new LazyPromiseObservable(async () => {
        const items = await callApi(Apis.Users.GetUsers, null);
        items.forEach(item => this._transactions.updateValueDirectly(item.name, item));
        return items;
    });
    private readonly _transactions = new PromiseCacheObservable((name: string) => callApi(Apis.Users.GetUser, { name }));

    public get users() { return this._users.value; }

    public getTransactions(name: string) {
        return this._transactions.getDeferred(name);
    }
}
