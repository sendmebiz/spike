import { observer } from 'mobx-react-lite';
import { TextInputVM } from '@zajno/common-mobx/viewModels';
import { Input } from '../common/ui/input';
import { ActionBlock } from '@/viewModels/common/blocks';
import { BaseFormProps, FormFieldWrapper } from './base';


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
