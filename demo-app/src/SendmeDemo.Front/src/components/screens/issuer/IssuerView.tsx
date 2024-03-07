import { useModel } from '@/components/hooks/useViewModel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../common/ui/tabs';
import { cn } from '../../utils';
import { IssuerViewModel } from '@/viewModels/screens/Issuer';
import { CbdcInputs } from './cbdc';
import { PolicyInputs } from './policy';
import { ValidatorInputs } from './validator';

type Props = {
    className?: string;
};

type TabCompType = React.ComponentType<{ model: IssuerViewModel }>;

const TabsData: { value: string, title: string, Comp: TabCompType }[] = [
    { value: 'cbdc', title: 'CBDC', Comp: CbdcInputs },
    { value: 'policy', title: 'Policy', Comp: PolicyInputs },
    { value: 'validator', title: 'Validator', Comp: ValidatorInputs },
];

export const IssuerView = ({ className }: Props) => {

    const model = useModel(IssuerViewModel);

    return (
        <div className={cn(
            'w-full',
            className,
        )}>
            <Tabs
                defaultValue={TabsData[1].value}
                className='w-full'
            >
                <TabsList
                    className='w-full flex flex-row justify-around'
                >
                    {TabsData.map(({ value, title }) => (
                        <TabsTrigger key={value} value={value}>{title}</TabsTrigger>
                    ))}
                </TabsList>
                {TabsData.map(({ value, Comp }) => (
                    <TabsContent key={value} value={value} className='mt-14'>
                        <Comp model={model} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
