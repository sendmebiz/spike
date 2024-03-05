import { ValueModel } from '@zajno/common-mobx/viewModels';
import { LoadingModel, withLoading } from '@zajno/common-mobx/viewModels/LoadingModel';
import { transaction } from 'mobx';
import { ILogger, createLogger } from '@/logger';
import { Getter } from '@zajno/common/types';
import { PromiseExtended } from '@zajno/common/structures/promiseExtended';

export type IActionWorker<T, TCustomErrors extends Record<string, unknown> = never> = () => PromiseExtended<T, TCustomErrors>;

export class LogicModel {

    protected readonly _loading = new LoadingModel(true);

    protected readonly _error = new ValueModel<string | null>(null);
    protected readonly _errorSource = new ValueModel<Error | null>(null);

    public get isLoading(): boolean { return this._loading.value; }
    public get error(): string | null { return this._error.value; }
    public get errorSource(): Error | null { return this._errorSource.value; }

    protected logger: ILogger;

    constructor() {
        this.logger = createLogger(`[${this.constructor.name}]`);
    }

    protected onActionRun() {
        // override me
    }

    public resetError() {
        transaction(() => {
            this._error.reset();
            this._errorSource.reset();
        });
    }

    protected runAction<T = unknown>(worker: () => Promise<T>, name?: string, exclusive: boolean | 'throw' = false, errorCtx?: Getter<unknown>): PromiseExtended<T | undefined> {
        const started = Date.now();
        if (name) {
            this.logger.log(`runAction "${name}" started...`);
        }

        transaction(() => {
            this.resetError();
            this.onActionRun();
        });

        const runner = async () => {
            const result = await withLoading(this._loading, worker, exclusive);
            if (result === false) {
                this.logger.warn(`runAction "${name || '<unnamed>'}" has been skipped because in progress already`);
                return undefined;
            }

            if (name) {
                this.logger.log(`runAction "${name}" succeed in ${Date.now() - started}ms`);
            }
            return result;
        };

        return PromiseExtended.run(runner)
            .onError(data => {
                transaction(() => {
                    this._error.setValue(data.error);
                    this._errorSource.setValue(data.source);
                });

                this.logger.error(...formatError(name, data.source, errorCtx));
            });
    }
}

function formatError(this: void, actionName: string | null | undefined, err: Error | Error[], errorCtx?: Getter<unknown>) {
    const prepend = (val: unknown, ...strs: string[]) => (val ? [...strs, ...(Array.isArray(val) ? val : [val])] : [null]);
    const getErrorCause = () => {
        if (!err) {
            return [''];
        }

        if (Array.isArray(err)) {
            return err.map(e => e.cause ?? '');
        }
        return [err.cause ?? ''];
    };

    return [
        `runAction "${actionName || '<unnamed>'}" got an error(s):`,
        err,
        ...prepend(getErrorCause(), '\nCause:'),
        ...prepend(Getter.getValue(errorCtx), '\nContext:'),
    ];
}
