import { StatusCodes } from '@zajno/common/api/statusCodes';
import { ErrorCodes } from './constants';

export type ApiErrorResponse<TCause = never> = {
    error?: ErrorCodes,
    message?: string,
    description?: string,
} & ([TCause] extends [never] ? object : { cause?: TCause });

export namespace ApiErrorResponse {
    export function create<TCause = never>(code: ErrorCodes, message?: string, cause?: TCause): ApiErrorResponse<TCause> {
        return { code, message, cause };
    }
}


export class ApiError<
    TCause = unknown,
> extends Error {

    readonly cause?: TCause;

    constructor(
        public readonly status: StatusCodes,
        public readonly code: ErrorCodes,
        message: string,
        cause?: TCause,
    ) {
        super(message, { cause });
        this.cause = cause;

        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    public static fromResponse(status: StatusCodes, responseData: unknown) {
        const response = responseData as ApiErrorResponse<unknown>;
        if (!response || response.error == null) {
            return new ApiError(
                status,
                0,
                [
                    'An unknown error has occurred. Please try again later.',
                    response?.message && `Message: ${response.message}`,
                ].filter(Boolean).join('\n'),
            );
        }

        return new ApiError<unknown>(
            status,
            response.error,
            response.message || '<no message>',
            response.cause,
        );
    }
}
