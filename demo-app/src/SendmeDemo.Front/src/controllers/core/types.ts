import { IDisposable } from '@zajno/common/functions/disposer';

export interface IController extends IDisposable {
    readonly isLoading: boolean;

    initialize(): Promise<this>;
}

export interface ISyncable {
    sync(force?: boolean): Promise<void>;
}
