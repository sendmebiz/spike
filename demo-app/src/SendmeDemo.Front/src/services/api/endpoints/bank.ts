import { ApiEndpoint } from './_base';
import { TransferRequest } from './dtos/bank';

export type { TransferRequest };

export const Transfer = ApiEndpoint.post<null, string>()
    .withPath('cbdc/transfer')
    .withQuery<TransferRequest>('from', 'to', 'value')
;
export type Transfer = typeof Transfer;


export const CbdcMint = ApiEndpoint.post<null, string>()
    .withPath('cbdc/mint')
    .withQuery<{ value: number }>('value');
export type CbdcMint = typeof CbdcMint;

export const CbdcBurn = ApiEndpoint.post<null, string>()
    .withPath('cbdc/burn')
    .withQuery<{ value: number }>('value');
export type CbdcBurn = typeof CbdcBurn;

export const SetLimit = ApiEndpoint.post<null, string>()
    .withPath('cbdc/setLimit')
    .withQuery<{ limit: number }>('limit');
export type SetLimit = typeof SetLimit;

export const SetPeriod = ApiEndpoint.post<null, string>()
    .withPath('cbdc/setPeriod')
    .withQuery<{ time: number }>('time');
export type SetPeriod = typeof SetPeriod;
