import { Event } from '@zajno/common/observing/event';

export const WalletChanged = new Event<{ name?: string, action: WalletActionTypes }>();

export enum WalletActionTypes {
    transfer = 'transfer',
    mint = 'mint',
    burn = 'burn',
    kycMint = 'kycMint',
    kycBurn = 'kycBurn',
}
