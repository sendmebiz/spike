import { IssuerViewModel } from '@/viewModels/screens/Issuer';
import { observer } from 'mobx-react-lite';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@/components/common/ui/dropdown-menu';
import { Button } from '@/components/common/ui/button';
import { Select } from '@zajno/common-mobx/viewModels';
import { Granularity } from '@zajno/common/dates';
import { cn } from '@/components/utils';
import { AmountField } from '@/components/AmountForm';

type Props = {
    model: IssuerViewModel;
};

export const PolicyInputs = ({ model }: Props) => {

    return (
        <div className='flex flex-col gap-4 items-start p-6 background-gradient rounded-lg'>
            <AmountField
                model={model.SetLimit}
                placeholder='Enter amount'
                submitText='Set Limit'
            />
            <AmountField
                model={model.SetPeriod}
                placeholder='Amount'
                submitText='Set Period'
                secondaryInput={(
                    <SelectPeriod
                        className='ml-2 py-[26px]'
                        model={model.SetPeriod.Period}
                    />
                )}
            />
        </div>
    );
};

type SelectPeriodProps = {
    className?: string;
    model: Select<Granularity>;
    disabled?: boolean;
};

const SelectPeriod = observer(({ model, disabled, className }: SelectPeriodProps) => {

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
