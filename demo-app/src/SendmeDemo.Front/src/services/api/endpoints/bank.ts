import { ApiEndpoint } from './_base';
import { TransferRequest } from './dtos/bank';

export type { TransferRequest };

export const Transfer = ApiEndpoint.post<null, string>()
    .withPath('cbdc/transfer')
    .withQuery<TransferRequest>('from', 'to', 'value')
;
export type Transfer = typeof Transfer;
