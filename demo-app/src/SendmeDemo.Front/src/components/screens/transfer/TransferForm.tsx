import { Button } from '../../common/ui/button';
import { observer } from 'mobx-react-lite';
import { TransferViewModel } from '@/viewModels/screens/Transfer';
import { SelectUser } from '@/components/SelectUser';
import { AmountInputField } from '@/components/AmountInput';
import { ErrorView } from '@/components/ErrorView';

type Props = {
    model: TransferViewModel;
};

export const TransferForm = observer(({ model }: Props) => {
    return (
        <div className='w-full h-full'>
            <div className="mt-5 flex flex-col gap-4">
                <SelectUser
                    label='From'
                    model={model.FromUser}
                    disabled={model.isLoading}
                />
                <SelectUser
                    label='To'
                    model={model.ToUser}
                    disabled={model.isLoading}
                />

                <AmountInputField
                    label='Amount'
                    model={model.Amount}
                    placeholder='Enter amount'
                    disabled={model.isLoading}
                />

                <ErrorView error={model.error.value} />

                <div className='flex flex-row w-full justify-around mt-6'>
                    <Button onClick={model.submit} disabled={model.isLoading}>
                        {model.isLoading ? 'Processing...' : 'Submit'}
                    </Button>
                </div>
            </div>
        </div>
    );
});
