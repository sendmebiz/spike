import { Apis, callApi } from '@/services/api';
import { BaseController } from './core/base';
import { WalletActionTypes, WalletChanged } from './helpers/events';
import { LazyPromiseObservable } from '@zajno/common-mobx/lazy/observable';
import { ILazyPromise } from '@zajno/common/lazy/promise';
import { UserTransaction } from '@/services/api/endpoints/dtos/users';
import { IssuerName } from '@/constants/names';
import { runInAction } from 'mobx';
import { refreshData } from './helpers/refresher';
import { FlagModel } from '@zajno/common-mobx/viewModels';

export class BankController extends BaseController {

    private readonly _cbdcTransactions = new LazyPromiseObservable(() => callApi(Apis.Bank.GetTransactions, null));
    private readonly _isRefreshing = new FlagModel();

    public get transactions(): ILazyPromise<UserTransaction[]> { return this._cbdcTransactions; }
    public get isRefreshing() { return this._isRefreshing.value; }

    protected onInitialize(): void | Promise<void> {
        this.disposer.add(WalletChanged.on(data => this.refreshTransactions(data?.action)));
    }

    transfer = (request: Apis.Bank.TransferRequest) => this.runAction(async () => {
        const result = await callApi(Apis.Bank.Transfer, request, { log: 'full' });
        WalletChanged.trigger({ name: request.from, action: WalletActionTypes.transfer });
        WalletChanged.trigger({ name: request.to, action: WalletActionTypes.transfer });
        return result;
    }, WalletActionTypes.transfer);

    mint = (value: number) => this.runAction(async () => {
        const result = await callApi(Apis.Bank.CbdcMint, { value }, { log: 'full' });
        WalletChanged.trigger({ name: IssuerName, action: WalletActionTypes.mint });
        return result;
    }, WalletActionTypes.mint);

    burn = (value: number) => this.runAction(async () => {
        const result = await callApi(Apis.Bank.CbdcBurn, { value }, { log: 'full' });
        WalletChanged.trigger({ name: IssuerName, action: WalletActionTypes.burn });
        return result;
    }, WalletActionTypes.burn);

    setLimit = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.SetLimit, { limit: value }, { log: 'full' });
    }, 'setLimit');

    setPeriod = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.SetPeriod, { time: value }, { log: 'full' });
    }, 'setPeriod');

    kycMint = (name: string) => this.runAction(async () => {
        const result = await callApi(Apis.Bank.KycMint, { address: name }, { log: 'full' });
        WalletChanged.trigger({ name: name, action: WalletActionTypes.kycMint });
        return result;
    }, WalletActionTypes.kycMint);

    kycBurn = (tokenId: number) => this.runAction(async () => {
        const result = await callApi(Apis.Bank.KycBurn, { tokenId }, { log: 'full' });
        // WalletChanged.trigger();
        return result;
    }, WalletActionTypes.kycBurn);

    private refreshTransactions = async (action?: WalletActionTypes) => {
        if (action === WalletActionTypes.kycMint || action === WalletActionTypes.kycBurn) {
            return;
        }

        try {
            this._isRefreshing.setTrue();
            await refreshData(
                '_cbdcTransactions',
                this._cbdcTransactions.hasValue ? this._cbdcTransactions.value : undefined,
                () => callApi(Apis.Bank.GetTransactions, null),
            );

            runInAction(() => {
                this._cbdcTransactions.reset();
            });
        } finally {
            this._isRefreshing.setFalse();
        }
    };
}
