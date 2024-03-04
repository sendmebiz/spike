import { AppController } from '@/controllers';
import { Select, TextInputVM, ValueModel } from '@zajno/common-mobx/viewModels';
import { catchPromise } from '@zajno/common/functions/safe';
import { createLazy } from '@zajno/common/lazy/light';
import { IValueModelReadonly } from '@zajno/common/models/types';
import { combineUrls } from '@zajno/common/structures/path';
import { IsSomeInvalid } from '@zajno/common/validation';
import { createThrowers } from '@zajno/common/validation/throwers';
import { ComputedValueModel } from '@zajno/common-mobx/viewModels/ComputedValueModel';
import * as Yup from 'yup';
import { action } from 'mobx';

const Validations = createThrowers({
    User: Yup.object().required('Please select user'),
    Amount: Yup.number().required('Please enter amount').min(1, 'Amount should be greater than 0'),
});

export enum TransferStates {
    Transfer = 'transfer',
    Success = 'success',
    Fail = 'fail',
}

export class TransferViewModel {

    public readonly Mode = new ValueModel<TransferStates>(TransferStates.Transfer);

    public readonly FromUser = new Select(
        () => AppController.Instance.Users.users,
        u => u.name,
        -1,
    ).setValidationConfig(Validations.User);

    public readonly ToUser = new Select(
        () => AppController.Instance.Users.users,
        u => u.name,
        -1,
    ).setValidationConfig(Validations.User);

    public readonly Amount = new TextInputVM({ value: '0' })
        .setValidationConfig(Validations.Amount);

    private readonly _error = new ValueModel<string | null>(null);
    private readonly _transactionId = new ValueModel<string | null>();

    private readonly _validatables = createLazy(() => {
        const result = [this.FromUser, this.ToUser, this.Amount];
        result.forEach(v => v.validateOnChange(true));
        return result;
    });

    private readonly _transactionUrl = new ComputedValueModel(() => {
        const id = this._transactionId.value;
        if (!id) {
            return null;
        }

        return combineUrls(
            AppController.Instance.Settings.settings.etherscan,
            'tx',
            id,
        );
    });

    public get error(): IValueModelReadonly<string | null> { return this._error; }
    public get transactionId(): IValueModelReadonly<string | null> { return this._transactionId; }
    public get transactionUrl() { return this._transactionUrl.value; }

    submit = () => catchPromise((async () => {
        this._error.reset();

        if (await IsSomeInvalid(this._validatables.value, false)) {
            return;
        }

        // extra validation
        if (this.FromUser.selectedItem === this.ToUser.selectedItem) {
            this._error.setValue('Please select different users');
            return;
        }

        const request = {
            from: this.FromUser.selectedItem!.name,
            to: this.ToUser.selectedItem!.name,
            value: +this.Amount.value!,
        };

        await AppController.Instance.Bank.transfer(request)
            .onSuccess(id => {
                this._transactionId.setValue(id);
                if (id) {
                    this.Mode.setValue(TransferStates.Success);
                } else {
                    this.Mode.setValue(TransferStates.Fail);
                }
            })
            .onError(() => {
                this._transactionId.reset();
                this.Mode.setValue(TransferStates.Fail);
            });
    })(), err => {
        this._error.setValue(err.message);
    });

    resetToStart = action(() => {
        this.FromUser.reset();
        this.ToUser.reset();
        this.Amount.reset();

        this._transactionId.reset();

        this._error.reset();

        this.Mode.setValue(TransferStates.Transfer);
    });
}
