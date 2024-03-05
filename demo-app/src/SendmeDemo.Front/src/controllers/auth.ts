import { BaseController } from './core/base';
import { ValueModel } from '@zajno/common-mobx/viewModels';
import { IAuthController } from '../abstractions/auth';
import { Apis, callApi } from '@/services/api';
import { ApiError } from '@/services/api/error';
import { StatusCodes } from '@zajno/common/api/statusCodes';
import { INetworkAuthData, INetworkInterceptor, UnAuthorizedEventData } from '@/abstractions/interceptor';
import { SecureStorage } from '@/services/storage';

const StorageKeys = {
    accessToken: 'sm-auth-access-token',
    refreshToken: 'sm-auth-refresh-token',
    grantType: 'sm-auth-grant-type',
} as const;

export class AuthController extends BaseController implements IAuthController {

}
