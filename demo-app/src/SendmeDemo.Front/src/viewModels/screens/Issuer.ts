import { capitalize } from '@/components/utils/format';
import { AppController } from '@/controllers';
import { Select, TextInputVM, ValueModel } from '@zajno/common-mobx/viewModels';
import { Granularity } from '@zajno/common/dates';
import { PromiseExtended } from '@zajno/common/structures/promiseExtended';
import { Nullable } from '@zajno/common/types';
import { createThrowers } from '@zajno/common/validation/throwers';
import * as Yup from 'yup';

const Validations = createThrowers({
    Amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('Please enter amount')
        .min(0.00001, 'Amount should be greater than 0'),
    AmountInteger: Yup.number()
        .typeError('Please enter a valid number')
        .integer('Please enter a whole number')
        .required('Please enter amount')
        .min(1, 'Amount should be greater than 0'),
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
    public readonly SetLimit: ActionBlock = createBlock(
        v => AppController.Instance.Bank.setLimit(+v),
        Validations.Amount,
    );
    public readonly SetPeriod = createPeriodBlock();
}

export type ActionBlock = Readonly<ReturnType<typeof createBlock>>;

function createBlock(
    submit: (value: string) => PromiseExtended<void | string>,
    validation?: Parameters<TextInputVM['setValidationConfig']>[0],
) {
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

function createPeriodBlock() {
    const Period = new Select<Granularity.Constant>(
        [ 'second', 'minute', 'hour', 'day' ],
        a => capitalize(a),
        0,
    );

    const base = createBlock(
        v => {
            const seconds = Granularity.Constant.convert(+v, Period.selectedItem!, 'second');
            return AppController.Instance.Bank.setPeriod(seconds);
        },
        Validations.AmountInteger,
    );

    return {
        ...base,
        Period,
    };
}
