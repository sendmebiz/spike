import { Select } from '@zajno/common-mobx/viewModels';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '../common/ui/dropdown-menu';
import { Button } from '../common/ui/button';
import { observer } from 'mobx-react-lite';
import { Granularity } from '@zajno/common/dates';
import { cn } from '../utils/tw';


type SelectPeriodProps = {
    className?: string;
    model: Select<Granularity>;
    disabled?: boolean;
};

export const SelectPeriod = observer(({ model, disabled, className }: SelectPeriodProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline' className={cn(
                        'w-1/2 border-white/50',
                        className,
                        model.selectedValue ? 'text-primary' : 'text-paragraphs',
                    )}
                    disabled={disabled}
                >
                    {model.selectedValue ? model.selectedValue : 'Select user'}
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
