
import { createLazy } from '@zajno/common/lazy/light';
import { AppController } from '@/controllers';
import { Disposer, IDisposable } from '@zajno/common/functions/disposer';
import { FlagModel, NumberModel } from '@zajno/common-mobx/viewModels';

export class AppViewModel implements IDisposable {
    private static readonly _instance = createLazy(() => new AppViewModel());
    public static get Instance() { return AppViewModel._instance.value; }

    private readonly _disposer = new Disposer();

    public readonly IsActive = new FlagModel(true);
    public readonly PreloadingItems = new NumberModel(0);

    private _initializing: Promise<void> | null = null;

    private constructor() {
        this._initializing = AppController.Instance.initialize();
    }

    public get initializing() { return this._initializing; }
    public get isLoading() { return this.PreloadingItems.value > 0 || AppController.Instance.isInitializing; }

    dispose() {
        this._disposer.dispose();
    }

    public static Destroy() {
        if (AppViewModel._instance.hasValue) {
            AppViewModel._instance.value.dispose();
            AppViewModel._instance.reset();
        }
    }
}
