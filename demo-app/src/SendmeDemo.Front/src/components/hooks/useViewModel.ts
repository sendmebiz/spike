
import { useCallback, useEffect, useMemo } from 'react';
import type { IDisposable } from '@zajno/common/functions/disposer';
import { Nullable } from '@zajno/common/types';

interface ModelCtor<T, TArgs extends unknown[] = []> {
    new (...args: TArgs): T;
}

type ModelOrCtor<T> = T | ModelCtor<T>;

type InitializableModel<TArgs extends unknown[] = []> = IDisposable & {
    initialize(...args: TArgs): void
};

export const useModel = <T, TArgs extends unknown[] = []>(ModelCtor: ModelCtor<T, TArgs>, ...args: TArgs) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should not re-create model when args change
    return useMemo(() => new ModelCtor(...args), [ModelCtor]);
};

export const useInitializeModel = <T extends InitializableModel<TArgs>, TArgs extends unknown[]>(modelCtor: ModelOrCtor<T>, ...dependencies: TArgs) => {
    return useGenericModel(modelCtor, m => m.initialize(...dependencies), m => m.dispose(), ...dependencies);
};

export const useModelInit = <T>(modelCtor: ModelOrCtor<T>, initialize: (model: T) => void, ...dependencies: unknown[]) => {
    return useGenericModel(modelCtor, initialize, null, ...dependencies);
};

// Version for IDisposable
export const useDisposableModel = <T extends IDisposable>(modelCtor: ModelOrCtor<T>, initialize?: (model: T) => void, ...dependencies: unknown[]): T => {
    return useGenericModel(modelCtor, initialize, m => m.dispose(), ...dependencies);
};

// The most general version
export const useGenericModel = <T>(modelCtor: ModelOrCtor<T>, initialize: Nullable<(model: T) => void>, dispose: Nullable<(model: T) => void>, ...dependencies: unknown[]) => {
    const model = useMemo(
        () => {
            return typeof modelCtor === 'function'
                ? new (modelCtor as ModelCtor<T>)()
                : modelCtor;
        },
        [modelCtor],
    );

    // re-create initialize & dispose only on dependency change; these functions should be pure otherwise
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initializeCb = useCallback(initialize as NonNullable<typeof initialize>, dependencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const disposeCb = useCallback(dispose as NonNullable<typeof dispose>, dependencies);

    useEffect(() => {
        if (initializeCb) {
            initializeCb(model);
        }
        return disposeCb ? () => {
            disposeCb(model);
        } : undefined;
    }, [model, initializeCb, disposeCb]);

    return model;
};
