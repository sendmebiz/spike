import { useModel } from '@/components/hooks/useViewModel';
import { TransferStates, TransferViewModel } from '@/viewModels/screens/Transfer';
import { TransferForm } from './TransferForm';
import { TransferSuccess } from './Success';
import { TransferFail } from './Fail';
import { observer } from 'mobx-react-lite';

export const TransferDialog = observer(() => {
    const model = useModel(TransferViewModel);

    switch (model.Mode.value) {
        case TransferStates.Transfer: {
            return <TransferForm model={model} />;
        }

        case TransferStates.Success: {
            return <TransferSuccess model={model} />;
        }

        case TransferStates.Fail: {
            return <TransferFail model={model} />;
        }

        default: {
            return null;
        }
    }

});
