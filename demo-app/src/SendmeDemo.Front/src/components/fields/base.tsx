import { BaseActionBlock } from '@/viewModels/common/blocks';
import { observer } from 'mobx-react-lite';
import { Button } from '../common/ui/button';
import { getTransactionLink } from '@/viewModels/screens/utils/links';
import { shortenAddress } from '../utils/format';
import { ErrorView } from '../ErrorView';

import OutIconUrl from '@/assets/out-icon.svg?url';


export type BaseFormProps = {
    model: BaseActionBlock,
    submitText?: string;
    placeholder?: string;
    handler?: React.ReactNode;
    disabled?: boolean;
};

export const FormFieldWrapper = observer(({ model, children, submitText, handler }: React.PropsWithChildren<BaseFormProps>) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-row w-full items-baseline gap-10'>
                <div
                    className='basis-[31%] shrink-0 flex flex-row flex-nowrap items-center'
                >
                    {children}
                </div>

                {handler || (
                    <Button
                        className='basis-[25%] shrink-0'
                        onClick={model.Submit}
                    >
                        {submitText || 'Submit'}
                    </Button>
                )}

                {model.TransactionId.value && (
                    <a
                        target='_blank'
                        href={getTransactionLink(model.TransactionId.value)}
                        className='basis-[25%] flex flex-row glow-hover-inner-img hover:underline text-accent-a1 gap-1'
                    >
                        {shortenAddress(model.TransactionId.value)}
                        <img src={OutIconUrl} alt='Open in etherscan' className='inline w-4 self-start' />
                    </a>
                )}
            </div>
            <ErrorView
                className='self-start'
                error={model.Input.error || model.Error.value}
            />
        </div>
    );
});
