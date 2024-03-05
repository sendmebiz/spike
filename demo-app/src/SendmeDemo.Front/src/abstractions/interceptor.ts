import { ErrorCodes } from '@/services/api/constants';
import { IEndpointInfo } from '@zajno/common/api';
import { StatusCodes } from '@zajno/common/api/statusCodes';
import { IValueModelReadonly } from '@zajno/common/models/types';
import { IEvent } from '@zajno/common/observing/event';
import { Getter } from '@zajno/common/types/getter';

export type UnAuthorizedEventData = {
    api: IEndpointInfo,
    status: StatusCodes,
    error?: ErrorCodes,
    callback?: 'retry' | 'logout',
};

export type ErrorEventData = {
    message: string;

    /** for alerts */
    critical?: boolean;
    /** requires logout */
    needsLogout?: boolean;
};

export interface INetworkAuthData {
    readonly accessToken: string;
    // readonly refreshToken: string;
}

export interface INetworkInterceptor {
    readonly requestsCount: IValueModelReadonly<number>;
    readonly isNewVersionAvailable: boolean;

    readonly errorOccurred: IEvent<ErrorEventData>;
    readonly onUnauthorized: IEvent<UnAuthorizedEventData>;

    addAuthData(data: Getter<INetworkAuthData | undefined>): void;
}
