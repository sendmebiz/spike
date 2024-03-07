import { AmountField, SelectUserForm } from '@/components/AmountForm';
import { IssuerViewModel } from '@/viewModels/screens/Issuer';

type Props = {
    model: IssuerViewModel;
};

export const ValidatorInputs = ({ model }: Props) => {

    return (
        <div className='flex flex-col gap-4 mt-6 items-start p-6 background-gradient rounded-lg'>
            <SelectUserForm
                model={model.KycMint}
                submitText='Issue'
            />
            <AmountField
                model={model.KycBurn}
                placeholder='Token ID'
                submitText='Clawback'
            />
        </div>
    );
};
