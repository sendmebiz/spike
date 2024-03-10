import { IssuerViewModel } from '@/viewModels/screens/Issuer';
import { AmountField } from '@/components/AmountForm';

type Props = {
    model: IssuerViewModel;
};

export const CbdcInputs = ({ model }: Props) => {

    return (
        <div className='flex flex-col gap-4 items-start p-6 background-gradient rounded-lg'>
            <AmountField
                model={model.Issue}
                placeholder='Enter amount'
                submitText='Issue'
            />
            <AmountField
                model={model.Burn}
                placeholder='Enter amount'
                submitText='Burn'
            />
        </div>
    );
};
