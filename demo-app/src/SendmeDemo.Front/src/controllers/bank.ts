import { Apis, callApi } from '@/services/api';
import { BaseController } from './core/base';
import { WorldChanged } from './helpers/events';

export class BankController extends BaseController {

    transfer = (request: Apis.Bank.TransferRequest) => this.runAction(async () => {
        return await callApi(Apis.Bank.Transfer, request, { log: 'full' });
    }, 'transfer');

    mint = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.CbdcMint, { value }, { log: 'full' });
    }, 'mint');

    burn = (value: number) => this.runAction(async () => {
        return await callApi(Apis.Bank.CbdcBurn, { value }, { log: 'full' });
    }, 'burn');

    protected onActionComplete(_name?: string | undefined): void {
        if (!this.isInitialized) {
            return;
        }

        WorldChanged.trigger();
    }
}
