import { ErrorView } from '@/components/ErrorView';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { shortenAddress } from '@/components/utils/format';
import { ActionBlock, IssuerViewModel } from '@/viewModels/screens/Issuer';
import { observer } from 'mobx-react-lite';
import OutIconUrl from '@/assets/out-icon.svg?url';
import { getTransactionLink } from '@/viewModels/screens/utils/links';

type Props = {
    model: IssuerViewModel;
};

export const CbdcInputs = ({ model }: Props) => {

    return (
        <div className='flex flex-col gap-4 mt-6 w-min items-start'>
            <AmountField
                model={model.Issue}
                placeholder='Enter amount'
                submitText='Issue'
            />
            <AmountField
                model={model.Burn}
                placeholder='Enter amount'
                submitText='Burn'
            />
        </div>
    );
};

type AmountFieldProps = {
    model: ActionBlock;
    placeholder?: string;
    disabled?: boolean;
    submitText?: string;
};

const AmountField = observer(({ model, placeholder, disabled, submitText }: AmountFieldProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row w-full items-baseline gap-10'>
                <Input
                    className='w-[200px]'
                    type='number'
                    value={model.Input.value || ''}
                    min={0}
                    onChange={e => model.Input.setValue(e.currentTarget.value)}
                    inputMode='numeric'
                    placeholder={placeholder}
                    disabled={disabled}
                />

                <Button
                    className='w-[200px]'
                    onClick={model.Submit}
                >
                    {submitText || 'Submit'}
                </Button>

                {model.TransactionId.value && (
                    <a
                        target='_blank'
                        href={getTransactionLink(model.TransactionId.value)}
                        className='flex flex-row glow-hover-inner-img hover:underline text-accent-a1 gap-1'
                    >
                        {shortenAddress(model.TransactionId.value)}
                        <img src={OutIconUrl} alt='Open in etherscan' className='inline w-4 self-start' />
                    </a>
                )}
            </div>
            <ErrorView error={model.Input.error || model.Error.value} />
        </div>
    );
});
