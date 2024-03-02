import { BaseController } from './core/base';
import { Apis, callApi } from '@/services/api';
import { LazyPromiseObservable } from '@zajno/common-mobx/lazy/observable';

export class UserController extends BaseController {

    private readonly _users = new LazyPromiseObservable(() => callApi(Apis.Users.GetUsers, null));

    public get users() { return this._users.value; }
}
