import { TextInputVM } from '@zajno/common-mobx/viewModels/TextModel';
import { observer } from 'mobx-react-lite';
import { Input } from './common/ui/input';
import { ErrorView } from './ErrorView';

type InputFieldProps = {
    model: TextInputVM;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
};

export const AmountInputField = observer(({ label, model, placeholder, disabled }: InputFieldProps) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-baseline justify-between w-full'>
                {label ? (
                    <div className='text-primary text-main'>
                        {label}
                    </div>
                ) : null}

                <Input
                    className='w-1/2 text-center'
                    type='number'
                    value={model.value || ''}
                    min={0}
                    onChange={e => model.setValue(e.currentTarget.value)}
                    inputMode='numeric'
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>
            <ErrorView error={model.error} />
        </div>
    );
});
