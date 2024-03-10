import { FlagModel, ValidatableModel } from '@zajno/common-mobx/viewModels';
import { IValueModel } from '@zajno/common/models/types';
import { Nullable } from '@zajno/common/types';

export class ValidatableFlagModel extends ValidatableModel<boolean> implements IValueModel<boolean> {
    public readonly flag = new FlagModel();

    public get value() { return this.flag.value; }
    public set value(v: boolean) { this.flag.value = v; }

    protected get valueToValidate(): Nullable<Readonly<boolean>> {
        return this.flag.value;
    }
}
