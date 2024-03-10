import { observer } from 'mobx-react-lite';
import { BaseFormProps, FormFieldWrapper } from './base';
import { ActionBlock } from '@/viewModels/common/blocks';
import { ValidatableFlagModel } from '@/viewModels/screens/utils/ValidatableFlagModel';
import { Switch } from '../common/ui/switch';
import { useCallback } from 'react';

type AmountFieldProps = Pick<BaseFormProps, 'disabled'> & {
    label: string;
    model: ActionBlock<ValidatableFlagModel>;
};

export const SwitchField = observer(({ model, label, disabled }: AmountFieldProps) => {

    const onFlagChange = useCallback((v: boolean) => {
        model.Input.flag.value = v;
        model.Submit();
    }, [model]);

    return (
        <FormFieldWrapper
            model={model}
            disabled={disabled}
            handler={(
                <Switch
                    disabled={disabled || model.InProgress.value}
                    checked={model.Input.flag.value}
                    onCheckedChange={onFlagChange}
                />
            )}
        >
            <div className='text-main text-white'>
                {label}
            </div>
        </FormFieldWrapper>
    );
});
