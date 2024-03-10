import { capitalize } from '@/components/utils/format';
import { IssuerName } from '@/constants/names';
import { AppController } from '@/controllers';
import { User } from '@/services/api/endpoints/dtos/users';
import { Select, TextInputVM } from '@zajno/common-mobx/viewModels';
import { Granularity } from '@zajno/common/dates';
import { Disposable } from '@zajno/common/functions/disposer';
import { createThrowers } from '@zajno/common/validation/throwers';
import { reaction, runInAction, transaction } from 'mobx';
import * as Yup from 'yup';
import { ValidatableFlagModel } from './utils/ValidatableFlagModel';
import { createBlock } from '../common/blocks';

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

export class IssuerViewModel extends Disposable {

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

    public readonly KycEnabled = createBlock(
        new ValidatableFlagModel(),
        v => AppController.Instance.Bank.setKycEnabled(v.flag.value),
    );

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

    initialize = () => {
        this.disposer.add(
            reaction(
                () => AppController.Instance.Bank.policyState.value,
                v => {
                    if (!v) {
                        return;
                    }

                    transaction(() => {
                        this.SetLimit.Input.value = v.limit.toString();
                        this.SetPeriod.Period.selectedItem = 'second';
                        this.SetPeriod.Input.value = v.period.toString();
                        this.KycEnabled.Input.flag.setValue(!!v.kycEnabled);
                    });
                },
                { fireImmediately: true },
            )
        );

        this.disposer.add(
            reaction(
                () => this.SetPeriod.Period.selectedItem,
                (gran, prev) => {
                    if (!gran || !prev) {
                        return;
                    }

                    const val = +this.SetPeriod.Input.value!;
                    if (!val) {
                        return;
                    }

                    runInAction(() => {
                        this.SetPeriod.Input.value = Granularity.Constant.convert(val, prev, gran).toString();
                    });
                },
            )
        );
    };
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
