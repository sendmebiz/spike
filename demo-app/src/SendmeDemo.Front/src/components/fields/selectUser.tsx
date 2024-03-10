import { ActionBlock } from '@/viewModels/common/blocks';
import { BaseFormProps, FormFieldWrapper } from './base';
import { Select } from '@zajno/common-mobx/viewModels';
import { User } from '@/services/api/endpoints/dtos/users';
import { observer } from 'mobx-react-lite';
import { SelectUserDropDown } from '../SelectUser';


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
