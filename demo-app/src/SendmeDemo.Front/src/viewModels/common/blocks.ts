import { FlagModel, ValidatableModel, ValueModel } from '@zajno/common-mobx/viewModels';
import { PromiseExtended } from '@zajno/common/structures/promiseExtended';
import { Nullable } from '@zajno/common/types';


export type ActionBlock<TInput extends ValidatableModel<any>> = Readonly<ReturnType<typeof createBlock<TInput>>>;
export type BaseActionBlock = Pick<ActionBlock<any>, 'Error' | 'TransactionId' | 'Submit'> & {
    Input: ValidatableModel<any>;
};

export function createBlock<
    TInput extends ValidatableModel<any>,
>(
    Input: TInput,
    submit: (value: TInput) => PromiseExtended<void | string>,
) {
    const Error = new ValueModel<string | null>(null);
    const TransactionId = new ValueModel<Nullable<string>>(null);
    const InProgress = new FlagModel();

    const Submit = async () => {
        Error.reset();
        TransactionId.reset();

        Input.validateOnChange(true);

        if (!(await Input.validate())) {
            return;
        }

        InProgress.setTrue();

        try {
            await submit(Input)
                .onError(e => { Error.value = e.error; })
                .onSuccess(result => {
                    TransactionId.value = result || null;
                    Input.reset();
                });
        } finally {
            InProgress.setFalse();
        }
    };

    return { Error, Input, TransactionId, Submit, InProgress };
}
