import { capitalize } from '@/components/utils/format';
import { IssuerName } from '@/constants/names';
import { AppController } from '@/controllers';
import { User } from '@/services/api/endpoints/dtos/users';
import { Select, TextInputVM, ValidatableModel, ValueModel } from '@zajno/common-mobx/viewModels';
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
    User: Yup.mixed().required('Please select user'),
});

export class IssuerViewModel {

    public readonly Issue = createBlock(
        new TextInputVM().setValidationConfig(Validations.Amount),
        v => AppController.Instance.Bank.mint(+v.value!),
    );
    public readonly Burn = createBlock(
        new TextInputVM().setValidationConfig(Validations.Amount),
        v => AppController.Instance.Bank.burn(+v.value!),
    );
    public readonly SetLimit = createBlock(
        new TextInputVM().setValidationConfig(Validations.Amount),
        v => AppController.Instance.Bank.setLimit(+v.value!),
    );
    public readonly SetPeriod = createPeriodBlock();

    public readonly KycMint = createBlock(
        new Select<User>(
            () => AppController.Instance.Users.users.value?.filter(u => u.name !== IssuerName) || [],
            u => u.name,
            -1,
        ).setValidationConfig(Validations.User),
        v => AppController.Instance.Bank.kycMint(v.selectedItem!.name),
    );

    public readonly KycBurn = createBlock(
        new TextInputVM().setValidationConfig(Validations.AmountInteger),
        v => AppController.Instance.Bank.kycBurn(+v.value!),
    );
}

export type ActionBlock<TInput extends ValidatableModel<any>> = Readonly<ReturnType<typeof createBlock<TInput>>>;
export type BaseActionBlock = Pick<ActionBlock<any>, 'Error' | 'TransactionId' | 'Submit'> & {
    Input: ValidatableModel<any>;
};

function createBlock<
    TInput extends ValidatableModel<any>,
>(
    Input: TInput,
    submit: (value: TInput) => PromiseExtended<void | string>,
) {
    const Error = new ValueModel<string | null>(null);
    const TransactionId = new ValueModel<Nullable<string>>(null);

    const Submit = async () => {
        Error.reset();
        TransactionId.reset();

        Input.validateOnChange(true);

        if (!(await Input.validate())) {
            return;
        }

        await submit(Input)
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
        ['second', 'minute', 'hour', 'day'],
        a => capitalize(a),
        0,
    );

    const base = createBlock(
        new TextInputVM().setValidationConfig(Validations.AmountInteger),
        v => {
            const seconds = Granularity.Constant.convert(+v.value!, Period.selectedItem!, 'second');
            return AppController.Instance.Bank.setPeriod(seconds);
        },
    );

    return {
        ...base,
        Period,
    };
}
