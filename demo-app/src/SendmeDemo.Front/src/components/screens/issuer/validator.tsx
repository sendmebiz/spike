import { AmountField } from '@/components/fields/amount';
import { SelectUserForm } from '@/components/fields/selectUser';
import { IssuerViewModel } from '@/viewModels/screens/Issuer';

type Props = {
    model: IssuerViewModel;
};

export const ValidatorInputs = ({ model }: Props) => {

    return (
        <div className='flex flex-col gap-4 items-start p-6 background-gradient rounded-lg'>
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
