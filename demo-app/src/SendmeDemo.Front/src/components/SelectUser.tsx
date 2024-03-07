import { Select } from '@zajno/common-mobx/viewModels/SelectModel';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from './common/ui/dropdown-menu';
import { Button } from './common/ui/button';
import { ErrorView } from './ErrorView';
import { observer } from 'mobx-react-lite';
import { User } from '@/services/api/endpoints/dtos/users';
import { cn } from './utils';

type SelectUserDropDownProps = {
    model: Select<User>;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
};

type SelectUserProps = SelectUserDropDownProps & {
    label: string;
};

export const SelectUser = observer(({ label, model, disabled, placeholder }: SelectUserProps) => {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-row items-baseline justify-between">
                <div className='text-primary text-main'>
                    {label}
                </div>
                <SelectUserDropDown
                    className='w-1/2'
                    model={model}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            </div>
            <ErrorView error={model.error} />
        </div>
    );
});

export const SelectUserDropDown = observer(({ model, disabled, placeholder, className }: SelectUserDropDownProps) => {

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'border-white/50',
                        className,
                        model.selectedValue ? 'text-primary' : 'text-paragraphs',
                    )}
                    disabled={disabled}
                >
                    {model.selectedValue ? model.selectedValue : (placeholder || 'Select user')}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent
                    className='bg-background text-primary rounded-lg border-2 border-border z-50 w-[200px]'
                >
                    {model.values.map((user, index) => (
                        <DropdownMenuItem
                            key={index}
                            asChild
                            onSelect={() => model.setIndex(index)}
                        >
                            <Button
                                variant='ghost'
                                className='w-full text-primary text-left px-4 py-2'
                            >
                                {user}
                            </Button>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
});
