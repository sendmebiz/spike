import { AppController } from '@/controllers';
import { TextInputVM, ValueModel } from '@zajno/common-mobx/viewModels';
import { PromiseExtended } from '@zajno/common/structures/promiseExtended';
import { Nullable } from '@zajno/common/types';
import { createThrowers } from '@zajno/common/validation/throwers';
import * as Yup from 'yup';

const Validations = createThrowers({
    Amount: Yup.number().required('Please enter amount').min(0.00001, 'Amount should be greater than 0'),
});

export class IssuerViewModel {

    public readonly Issue: ActionBlock = createBlock(
        v => AppController.Instance.Bank.mint(+v),
        Validations.Amount,
    );
    public readonly Burn: ActionBlock = createBlock(
        v => AppController.Instance.Bank.burn(+v),
        Validations.Amount,
    );
}

export type ActionBlock = Readonly<ReturnType<typeof createBlock>>;

function createBlock(submit: (value: string) => PromiseExtended<void | string>, validation?: Parameters<TextInputVM['setValidationConfig']>[0]) {
    const Error = new ValueModel<string | null>(null);
    const Input = new TextInputVM()
        .setValidationConfig(validation);
    const TransactionId = new ValueModel<Nullable<string>>(null);

    const Submit = async () => {
        Error.reset();
        TransactionId.reset();

        if (!(await Input.validate())) {
            return;
        }

        await submit(Input.value!)
            .onError(e => { Error.value = e.error; })
            .onSuccess(result => {
                TransactionId.value = result || null;
                Input.reset();
            });
    };

    return { Error, Input, TransactionId, Submit };
}
