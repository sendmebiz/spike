import { LazyPromise } from '@zajno/common/lazy/promise';
import { LazyPromiseObservable } from '@zajno/common-mobx/lazy/observable';

import { BaseController } from './base';

export function createControllerLoader<T extends BaseController>(factory: () => T, observable = false): LazyPromise<T> {
    const LP = observable ? LazyPromiseObservable : LazyPromise;

    return new LP(async () => {
        const controller = factory();
        await controller.initialize();
        return controller;
    });
}

export function createControllerImportLoader<T extends BaseController>(importPromise: () => Promise<{ default: new () => T }>, observable = false): LazyPromise<T> {
    const LP = observable ? LazyPromiseObservable : LazyPromise;

    return new LP(async () => {
        const { default: ctor } = await importPromise();
        const controller = new ctor();
        await controller.initialize();
        return controller;
    });
}
