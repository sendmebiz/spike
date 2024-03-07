import { Apis, callApi } from '@/services/api';
import { BaseController } from './core/base';
import { WorldChanged } from './helpers/events';

enum ActionTypes {
    transfer = 'transfer',
    mint = 'mint',
    burn = 'burn',
    setLimit = 'setLimit',
    setPeriod = 'setPeriod',
}

export class BankController extends BaseController {

    transfer = (request: Apis.Bank.TransferRequest) => this.runAction(async () => {
        return await callApi(Apis.Bank.Transfer, request, { log: 'full' });
    }, ActionTypes.transfer);

    mint = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.CbdcMint, { value }, { log: 'full' });
    }, ActionTypes.mint);

    burn = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.CbdcBurn, { value }, { log: 'full' });
    }, ActionTypes.burn);

    setLimit = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.SetLimit, { limit: value }, { log: 'full' });
    }, ActionTypes.setLimit);

    setPeriod = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.SetPeriod, { time: value }, { log: 'full' });
    }, ActionTypes.setPeriod);

    protected onActionComplete(name?: string | undefined): void {
        if (!this.isInitialized || name === ActionTypes.setPeriod || name === ActionTypes.setLimit) {
            return;
        }

        WorldChanged.trigger();
    }
}
