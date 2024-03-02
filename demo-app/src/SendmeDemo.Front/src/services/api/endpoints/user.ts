import { ApiEndpoint, ApiPrefixes } from './_base';

export const GetUsers = ApiEndpoint.get()
    .withPath('users');
