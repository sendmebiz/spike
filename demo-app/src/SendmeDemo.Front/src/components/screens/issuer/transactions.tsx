import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';
import { TransactionsTable } from '../TransactionsTable';
import { Loader } from '@/components/Loader';
import { twMerge } from '@/components/utils';

export { WalletTransactions } from '../WalletTransactionsTable';

type Props = {
    className?: string;
};

export const CBDCTransactions = observer(({ className }: Props) => {
    const transactions = AppController.Instance.Bank.transactions.value;
    const isRefreshing = AppController.Instance.Bank.isRefreshing;

    return (
        <div
            className={twMerge('relative', className)}
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
