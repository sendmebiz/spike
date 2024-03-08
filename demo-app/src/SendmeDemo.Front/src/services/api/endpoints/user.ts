import { Path } from '@zajno/common/structures/path';
import { ApiEndpoint } from './_base';
import { User, UserTransaction } from './dtos/users';

export const GetUsers = ApiEndpoint.get<User[]>()
    .withPath('users');

export const GetUser = ApiEndpoint.get<User>()
    .withPath('users', Path.build`${'name'}`);

export const GetTransactions = ApiEndpoint.get<UserTransaction[]>()
    .withPath('users', Path.build`${'name'}`, 'transactions');
