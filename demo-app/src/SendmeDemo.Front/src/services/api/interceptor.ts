import axios, { AxiosError } from 'axios';
import { Disposable } from '@zajno/common/functions/disposer';
import { NumberModel } from '@zajno/common-mobx/viewModels/NumberModel';
import { FlagModel } from '@zajno/common-mobx/viewModels/FlagModel';
import { Event } from '@zajno/common/observing/event';
import type { RequestConfigDetails } from '@zajno/common/api/call';
import { getFormattedDisplayName } from '@zajno/common/api';
import { Getter } from '@zajno/common/types';
import { createLogger } from '@/logger';
import { StatusCodes, ErrorCodes, Texts } from './constants';
import { ApiError } from './error';
import { ApiEndpoint, EndpointMethods } from './endpoints/_base';
import { ErrorEventData, INetworkAuthData, INetworkInterceptor, UnAuthorizedEventData } from '@/abstractions/interceptor';
import { IValueModelReadonly } from '@zajno/common/models/types';


const logger = createLogger('[API]');

export class NetworkInterceptor extends Disposable implements INetworkInterceptor {

    private readonly _requestsCount = new NumberModel(0);
    private readonly _errorOccurred = new Event<ErrorEventData>();
    private readonly _onUnauthorized = new Event<UnAuthorizedEventData>();
    private readonly _isNewVersionAvailable = new FlagModel(false);

    private _authData: Getter<INetworkAuthData | undefined>;

    public get requestsCount(): IValueModelReadonly<number> { return this._requestsCount; }
    public get errorOccurred() { return this._errorOccurred.expose(); }
    public get onUnauthorized() { return this._onUnauthorized.expose(); }
    public get isNewVersionAvailable() { return this._isNewVersionAvailable.value; }

    public init() {
        this.initAxiosInterceptors();
    }

    addAuthData(data: Getter<INetworkAuthData | undefined>) {
        this._authData = data;
    }

    private initAxiosInterceptors() {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                const cfg = config as unknown as RequestConfigDetails;
                if (!cfg) {
                    logger.warn('[BAD] No config in request!', config);
                    return config;
                }

                if (!cfg._noLoader) {
                    this._requestsCount.increment();
                }

                const authData = Getter.getValue(this._authData);
                if (authData) {
                    config.headers.Authorization = `Bearer ${authData.accessToken}`;
                }

                const shouldLog = cfg._log === true || cfg._log === 'full' || cfg._log === 'req';

                if (shouldLog && cfg._api && (cfg._api.method !== EndpointMethods.GET || cfg.data != null)) {
                    logger.log('REQ ====>', cfg._api.method, cfg.url, cfg.data);
                }

                return config;
            },
            error => Promise.reject(error),
        );

        this.disposer.add(() => axios.interceptors.request.eject(requestInterceptor));

        const responseInterceptor = axios.interceptors.response.use(
            response => {
                const cfg = response.config as unknown as RequestConfigDetails;
                if (!cfg) {
                    logger.warn('[BAD] No config in response!', response);
                    return response;
                }
                if (!cfg?._noLoader) {
                    this._requestsCount.decrement();
                }

                const shouldLog = cfg._log === true || cfg._log === 'full' || cfg._log === 'res';
                if (shouldLog && cfg._api) {
                    logger.log('RES <====', cfg._api.method, cfg.url, response.data);
                }

                return response;
            },
            async (error: AxiosError) => {
                const cfg = error.config as unknown as RequestConfigDetails;
                if (!cfg) {
                    logger.warn('[BAD] No config in error!', error);
                    throw error;
                }

                if (!cfg._noLoader) {
                    this._requestsCount.decrement();
                }

                const apiName = cfg._api && cfg._api instanceof ApiEndpoint && getFormattedDisplayName(cfg._api);

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    logger.log('Response ERROR!', cfg.url, cfg.data, error.response.data, error.response.status, error.response.headers);

                    const data = error.response.data;
                    const resultError = ApiError.fromResponse(error.response.status, data);

                    if (error.response.status === StatusCodes.UNAUTHORIZED as number) {
                        const data: UnAuthorizedEventData = {
                            api: cfg._api,
                            status: resultError.status,
                            error: resultError.code,
                        };
                        await this._onUnauthorized.triggerAsync(data);

                        // if someones handles this event and sets 'retry' callback, we should retry the request
                        if (data.callback === 'retry') {
                            return axios.request(cfg);
                        }

                        if (data.callback === 'logout') {
                            this._errorOccurred.trigger({ message: Texts.Errors.SESSION_EXPIRED, critical: true, needsLogout: true });
                            return;
                        }

                    } else if (error.response.status === StatusCodes.UPGRADE_REQUIRED as number) {
                        this._isNewVersionAvailable.setTrue();
                    }

                    this.handleAPIError(resultError);

                    throw resultError;
                }

                if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    logger.log('Request ERROR!', apiName || '???', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    logger.log('General ERROR!', apiName || '???', error.message);
                }

                return Promise.reject(error);
            },
        );

        this.disposer.add(() => axios.interceptors.response.eject(responseInterceptor));
    }

    private handleAPIError(error: ApiError) {
        const { status, code, message } = error;

        let eventData: ErrorEventData | null = null;

        switch (status) {
            case StatusCodes.FORBIDDEN:
            case StatusCodes.UNAUTHORIZED: { // non-authorized
                switch (code) {
                    case ErrorCodes.TOKEN_EXPIRED:
                    case ErrorCodes.USER_NOT_VERIFIED:
                    case ErrorCodes.NOT_AUTHENTICATED: {
                        eventData = {
                            message: Texts.Errors.SESSION_EXPIRED,
                            critical: true,
                            needsLogout: true,
                        };
                        break;
                    }

                    case ErrorCodes.NOT_AUTHORIZED_ROLE:
                    case ErrorCodes.NOT_AUTHORIZED_PERMISSION: {
                        eventData = {
                            message: Texts.Errors.MISMATCH_PERMISSION,
                            critical: true,
                        };
                        break;
                    }

                    default:
                        break;
                }

                break; // case 401
            }

            case StatusCodes.BAD_REQUEST: { // bad request

                if (message && typeof message === 'string') {
                    eventData = {
                        message,
                    };
                }

                break;
            }

            default: {
                eventData = {
                    message: 'Unknown error occurred.',
                };
                break;
            }
        }

        if (eventData != null) {
            this._errorOccurred.trigger(eventData);
        }
    }
}
