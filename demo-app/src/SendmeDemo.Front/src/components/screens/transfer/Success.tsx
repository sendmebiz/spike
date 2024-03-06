import { Button } from '@/components/common/ui/button';
import { shortenAddress } from '@/components/utils/format';
import { TransferViewModel } from '@/viewModels/screens/Transfer';
import { Send, ArrowUpRightFromSquare } from 'lucide-react';
import { observer } from 'mobx-react-lite';

type Props = {
    model: TransferViewModel;
};

export const TransferSuccess = observer(({ model }: Props) => {

    return (
        <div className="w-full flex flex-col">
            <Send className="w-20 h-20 mx-auto mt-10 text-accent-a1" />

            <div className='text-paragraph w-full text-center text-primary mt-4'>
                Transaction successful
            </div>

            <a
                href={model.transactionUrl || '#'}
                target='_blank'
                className='block text-paragraph w-max text-center text-accent-a1 mt-4 self-center'
            >
                {shortenAddress(model.transactionId.value)}
                <ArrowUpRightFromSquare
                    className='inline w-[14px] mb-4'
                />
            </a>

            <div className='flex flex-row justify-center mt-10'>
                <Button onClick={model.resetToStart}>
                    Make Another One
                </Button>
            </div>
        </div>
    );
});
