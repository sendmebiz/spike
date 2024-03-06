import { AppController } from '@/controllers';
import { combineUrls } from '@zajno/common/structures/path';

export function getTransactionLink(id: string) {
    return combineUrls(
        AppController.Instance.Settings.settings.etherscan,
        'tx',
        id,
    );
}

export function getAddressLink(address: string) {
    return combineUrls(
        AppController.Instance.Settings.settings.etherscan,
        'address',
        address,
    );
}
