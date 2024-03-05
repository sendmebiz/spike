import { DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu } from '../../common/ui/dropdown-menu';
import { Button } from '../../common/ui/button';
import { Select, TextInputVM } from '@zajno/common-mobx/viewModels';
import { observer } from 'mobx-react-lite';
import { User } from '@/services/api/endpoints/dtos/users';
import { Input } from '@/components/common/ui/input';
import { Nullable } from '@zajno/common/types';
import { TransferViewModel } from '@/viewModels/screens/Transfer';
import { twJoin } from 'tailwind-merge';

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

                <InputField
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

type SelectUserProps = {
    label: string;
    model: Select<User>;
    disabled?: boolean;
};

const SelectUser = observer(({ label, model, disabled }: SelectUserProps) => {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-row items-baseline justify-between">
                <div className='text-primary text-main'>
                    {label}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='outline' className={twJoin(
                                'w-1/2',
                                model.selectedValue ? 'text-primary' : 'text-paragraphs',
                            )}
                            disabled={disabled}
                        >
                            {model.selectedValue ? model.selectedValue : 'Select user'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent className='bg-background rounded-lg border-2 border-border z-50'>
                            {model.values.map((user, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    asChild
                                    onSelect={() => model.setIndex(index)}
                                >
                                    <Button variant='ghost' className='w-full'>
                                        {user}
                                    </Button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </div>
            <ErrorView error={model.error} />
        </div>
    );
});

type InputFieldProps = {
    label: string;
    model: TextInputVM;
    placeholder?: string;
    disabled?: boolean;
};

const InputField = observer(({ label, model, placeholder, disabled }: InputFieldProps) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-baseline justify-between w-full'>
                <div className='text-primary text-main'>
                    {label}
                </div>

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

const ErrorView = ({ error }: { error: Nullable<string> }) => {
    if (!error) return null;

    return (
        <div className='text-red-500 my-2 text-right text-small pr-1'>
            {error}
        </div>
    );
};
