import { Path } from '@zajno/common/structures/path';
import { ApiEndpoint } from './_base';
import { User } from './dtos/users';

export const GetUsers = ApiEndpoint.get<User[]>()
    .withPath('users');

export const GetUser = ApiEndpoint.get<User>()
    .withPath('users', Path.build`${'name'}`);
