import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';
import { TransactionsTable } from '../TransactionsTable';
import { Loader } from '@/components/Loader';

export { WalletTransactions } from '../WalletTransactionsTable';

export const CBDCTransactions = observer(() => {
    const transactions = AppController.Instance.Bank.transactions.value;
    const isRefreshing = AppController.Instance.Bank.isRefreshing;

    return (
        <div
            className='mt-10 relative'
        >
            <TransactionsTable
                items={transactions?.slice() || []}
            />

            <Loader
                visible={isRefreshing}
                className='w-full h-full absolute left-0 top-0 right-0 bottom-0 bg-black/80'
                loaderClassName='self-start mt-24'
            />
        </div>
    );
});
