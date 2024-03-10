import { IssuerViewModel } from '@/viewModels/screens/Issuer';
import { AmountField } from '@/components/fields/amount';
import { SwitchField } from '@/components/fields/switch';
import { SelectPeriod } from '@/components/fields/period';

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
            <SwitchField
                model={model.KycEnabled}
                label='KYC Required'
            />
        </div>
    );
};
