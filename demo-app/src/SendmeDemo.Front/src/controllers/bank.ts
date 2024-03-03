import { Apis, callApi } from '@/services/api';
import { BaseController } from './core/base';

export class BankController extends BaseController {

    transfer = (request: Apis.Bank.TransferRequest) => this.runAction(async () => {
        return await callApi(Apis.Bank.Transfer, request, { log: 'full' });
    }, 'transfer');
}
