import { ApiEndpoint } from './_base';
import { TransferRequest } from './dtos/bank';
import { UserTransaction } from './dtos/users';

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

export const GetPolicyState = ApiEndpoint.get<{ limit: number, period: number, kycEnabled: boolean }>()
    .withPath('cbdc/policy-state');

export const SetLimit = ApiEndpoint.post<null, string>()
    .withPath('cbdc/setLimit')
    .withQuery<{ limit: number }>('limit');
export type SetLimit = typeof SetLimit;

export const SetPeriod = ApiEndpoint.post<null, string>()
    .withPath('cbdc/setPeriod')
    .withQuery<{ time: number }>('time');
export type SetPeriod = typeof SetPeriod;

export const SetKycCheckEnabled = ApiEndpoint.post<null, string>()
    .withPath('cbdc/kyc-check')
    .withQuery<{ enabled: boolean }>('enabled');

export const KycMint = ApiEndpoint.post<null, string>()
    .withPath('kyc/mint')
    .withQuery<{ address: string }>('address');
export type KycMint = typeof KycMint;

export const KycBurn = ApiEndpoint.post<null, string>()
    .withPath('kyc/burn')
    .withQuery<{ tokenId: number }>('tokenId');
export type KycBurn = typeof KycBurn;

export const GetTransactions = ApiEndpoint.get<UserTransaction[]>()
    .withPath('cbdc/transactions');
