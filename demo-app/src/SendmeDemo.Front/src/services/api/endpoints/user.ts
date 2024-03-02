import { ApiEndpoint } from './_base';
import { User } from './dtos/users';

export const GetUsers = ApiEndpoint.get<User[]>()
    .withPath('users');
