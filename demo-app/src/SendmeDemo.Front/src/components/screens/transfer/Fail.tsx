import { Button } from '@/components/common/ui/button';
import { TransferViewModel } from '@/viewModels/screens/Transfer';
import { X } from 'lucide-react';
import { observer } from 'mobx-react-lite';

type Props = {
    model: TransferViewModel;
};

export const TransferFail = observer(({ model }: Props) => {

    return (
        <div className="w-full">
            <X className="w-20 h-20 mx-auto mt-10 text-red-500" />

            <div className='text-paragraph w-full text-center text-red-500 mt-4'>
                Transaction failed
            </div>

            <div className='flex flex-row justify-center mt-10'>
                <Button onClick={model.resetToStart}>
                    Transfer again
                </Button>
            </div>
        </div>
    );
});
