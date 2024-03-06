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
