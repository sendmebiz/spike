import { AnyObject } from '@zajno/common/types/misc';
import {
    ApiEndpoint,
    IEndpointInfo,
    EndpointMethods,
} from '@zajno/common/api';
import type * as Yup from 'yup';

export { EndpointMethods };

type SchemaValidation<T extends AnyObject | null> = T extends null ? never : Yup.ObjectSchema<T>;

declare module '@zajno/common/api' {
    export interface ApiEndpoint<
        TIn extends object | null,
        TOut,
        TPath extends readonly string[],
        TQuery extends object,
        TErrors,
        THeaders,
    > {
        validationBody?: SchemaValidation<TIn>;

        withBodyValidation(schema: SchemaValidation<TIn>): this;
    }

    interface IEndpointInfo {
        readonly validationBody?: Yup.ObjectSchema<AnyObject> | undefined;
    }
}

ApiEndpoint.prototype.withBodyValidation = function <TIn extends AnyObject | null>(
    this: ApiEndpoint<TIn, unknown, [], object, unknown, unknown>,
    schema: SchemaValidation<TIn>,
) {
    this.validationBody = schema;
    return this;
};

export { ApiEndpoint };
export type { IEndpointInfo };

export const ApiPrefixes = {
    base: '/',
    api: '/api/v1/',
    auth: '/connect/',
} as const;

// convenience re-exports
export type Output<T> = ApiEndpoint.ExtractOut<T>;
export type Errors<T> = ApiEndpoint.ExtractErrors<T>;
