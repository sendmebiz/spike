import { ApiEndpoint } from './_base';
import { AppSettings } from './dtos/settings';

export const Get = ApiEndpoint.get<AppSettings>()
    .withPath(['settings']);
