import { useInitializeModel } from '@/components/hooks/useViewModel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../common/ui/tabs';
import { cn } from '../../utils';
import { IssuerViewModel } from '@/viewModels/screens/Issuer';
import { CbdcInputs } from './cbdc';
import { PolicyInputs } from './policy';
import { ValidatorInputs } from './validator';
import { CBDCTransactions, WalletTransactions } from './transactions';

type Props = {
    className?: string;
};

type TabCompType = React.ComponentType<{ model: IssuerViewModel }>;

const ActionTabsData: { value: string, title: string, Comp: TabCompType }[] = [
    { value: 'cbdc', title: 'CBDC', Comp: CbdcInputs },
    { value: 'policy', title: 'Policy', Comp: PolicyInputs },
    { value: 'validator', title: 'Validator', Comp: ValidatorInputs },
];

const TransactionTabsData: { value: string, title: string, Comp: React.ComponentType }[] = [
    { value: 'cbdc', title: 'CBDC Transactions', Comp: CBDCTransactions },
    { value: 'wallet', title: 'Wallet Transactions', Comp: WalletTransactions },
];

export const IssuerView = ({ className }: Props) => {

    const model = useInitializeModel(IssuerViewModel);

    return (
        <div className={cn(
            'w-full',
            className,
        )}>
            <Tabs
                defaultValue={ActionTabsData[0].value}
                className='w-full'
            >
                <TabsList
                    className='w-full flex flex-row justify-around'
                >
                    {ActionTabsData.map(({ value, title }) => (
                        <TabsTrigger key={value} value={value}>{title}</TabsTrigger>
                    ))}
                </TabsList>
                {ActionTabsData.map(({ value, Comp }) => (
                    <TabsContent key={value} value={value} className='mt-3'>
                        <Comp model={model} />
                    </TabsContent>
                ))}
            </Tabs>

            <Tabs
                defaultValue={TransactionTabsData[0].value}
                className='w-full'
            >
                <TabsList
                    className='w-full flex flex-row justify-around mt-20'
                >
                    {TransactionTabsData.map(({ value, title }) => (
                        <TabsTrigger key={value} value={value}>{title}</TabsTrigger>
                    ))}
                </TabsList>
                {TransactionTabsData.map(({ value, Comp }) => (
                    <TabsContent key={value} value={value} className='mt-3'>
                        <Comp />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
