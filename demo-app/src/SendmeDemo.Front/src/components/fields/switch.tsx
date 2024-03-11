import { observer } from 'mobx-react-lite';
import { BaseFormProps, FormFieldWrapper } from './base';
import { ActionBlock } from '@/viewModels/common/blocks';
import { ValidatableFlagModel } from '@/viewModels/screens/utils/ValidatableFlagModel';
// import { Switch } from '../common/ui/switch';
import { useCallback } from 'react';
import { Button } from '../common/ui/button';

type AmountFieldProps = Pick<BaseFormProps, 'disabled'> & {
    label: string;
    model: ActionBlock<ValidatableFlagModel>;
};

export const SwitchField = observer(({ model, label, disabled }: AmountFieldProps) => {

    const onFlagChange = useCallback((v: boolean) => {
        model.Input.flag.value = v;
        model.Submit();
    }, [model]);

    const turnOn = useCallback(() => {
        onFlagChange(true);
    }, [onFlagChange]);

    const turnOff = useCallback(() => {
        onFlagChange(false);
    }, [onFlagChange]);

    return (
        <FormFieldWrapper
            model={model}
            disabled={disabled}
            handler={(
                // <Switch
                //     disabled={disabled || model.InProgress.value}
                //     checked={model.Input.flag.value}
                //     onCheckedChange={onFlagChange}
                // />
                <div className='basis-[25%] shrink-0 flex flex-row'>
                    <Button
                        variant='switcher'
                        className='basis-1/2 px-1 rounded-r-none'
                        disabled={disabled || model.InProgress.value || model.Input.flag.value}
                        onClick={turnOn}
                    >
                        ON
                    </Button>
                    <Button
                        variant='switcher'
                        className='basis-1/2 px-1 rounded-l-none'
                        disabled={disabled || model.InProgress.value || !model.Input.flag.value}
                        onClick={turnOff}
                    >
                        OFF
                    </Button>
                </div>
            )}
        >
            <div className='text-main text-white'>
                {label}
            </div>
        </FormFieldWrapper>
    );
});
