import { observer } from 'mobx-react-lite';
import { Button } from './common/ui/button';
import { ErrorView } from './ErrorView';
import { getTransactionLink } from '@/viewModels/screens/utils/links';
import { shortenAddress } from './utils/format';
import { ActionBlock, BaseActionBlock } from '@/viewModels/screens/Issuer';
import { Select, TextInputVM } from '@zajno/common-mobx/viewModels';
import { Input } from './common/ui/input';

import OutIconUrl from '@/assets/out-icon.svg?url';
import { User } from '@/services/api/endpoints/dtos/users';
import { SelectUserDropDown } from './SelectUser';

type BaseFormProps = {
    model: BaseActionBlock,
    submitText?: string;
    placeholder?: string;
    disabled?: boolean;
};

export const FormFieldWrapper = observer(({ model, children, submitText }: React.PropsWithChildren<BaseFormProps>) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-row w-full items-baseline gap-10'>
                <div
                    className='basis-[31%] shrink-0 flex flex-row flex-nowrap items-center'
                >
                    {children}
                </div>

                <Button
                    className='basis-[25%] shrink-0'
                    onClick={model.Submit}
                >
                    {submitText || 'Submit'}
                </Button>

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

type AmountFieldProps = BaseFormProps & {
    model: ActionBlock<TextInputVM>;
    secondaryInput?: React.ReactNode;
};

export const AmountField = observer(({ model, placeholder, disabled, submitText, secondaryInput }: AmountFieldProps) => {
    return (
        <FormFieldWrapper
            model={model}
            submitText={submitText}
        >
            <Input
                className='grow border-white/50'
                type='number'
                value={model.Input.value || ''}
                min={0}
                onChange={e => model.Input.setValue(e.currentTarget.value)}
                inputMode='numeric'
                placeholder={placeholder}
                disabled={disabled}
            />

            {secondaryInput}
        </FormFieldWrapper>
    );
});

type SelectUserFieldProps = BaseFormProps & {
    model: ActionBlock<Select<User>>;
    disabled?: boolean;
};

export const SelectUserForm = observer(({ model, submitText, disabled, placeholder }: SelectUserFieldProps) => {
    return (
        <FormFieldWrapper
            model={model}
            submitText={submitText}
        >
            <SelectUserDropDown
                className='grow'
                model={model.Input}
                disabled={disabled}
                placeholder={placeholder}
            />
        </FormFieldWrapper>
    );
});
