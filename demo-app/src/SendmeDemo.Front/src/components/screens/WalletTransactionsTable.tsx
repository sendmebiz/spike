import { IssuerName } from '@/constants/names';
import { AppController } from '@/controllers';
import { observer } from 'mobx-react-lite';
import { TransactionsTable } from './TransactionsTable';
import { Loader } from '../Loader';

type WalletTransactionProps = {
    name?: string;
};

export const WalletTransactions = observer(({ name = IssuerName }: WalletTransactionProps) => {
    const transactions = AppController.Instance.Users.getTransactions(name);
    const isRefreshing = transactions?.busy || AppController.Instance.Users.getIsRefreshing(name);

    return (
        <div
            className='mt-10 relative'
        >
            <TransactionsTable
                items={transactions?.current?.slice() || []}
            />

            <Loader
                visible={isRefreshing}
                className='w-full h-full absolute left-0 top-0 right-0 bottom-0 bg-black/80'
                loaderClassName='self-start mt-24'
            />
        </div>
    );
});
