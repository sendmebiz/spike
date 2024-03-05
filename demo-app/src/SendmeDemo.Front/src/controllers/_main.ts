import { Disposable } from '@zajno/common/functions/disposer';
import { createLazy } from '@zajno/common/lazy/light';
import { createManualPromise } from '@zajno/common/async/misc';
import { FlagModel } from '@zajno/common-mobx/viewModels/FlagModel';
import { AuthController } from './auth';
import { IController } from './core/types';
import { NetworkInterceptor } from '@/services/api/interceptor';
import { UserController } from './users';
import { cleanupProcessors } from '@/services/api';
import { SettingsController } from './settings';
import { BankController } from './bank';
// import { Guard } from './helpers/guard';

export class AppController extends Disposable {
    private static readonly _instance = createLazy(() => new AppController());
    public static get Instance() { return AppController._instance.value; }

    public static Destroy() {
        if (AppController._instance.hasValue) {
            AppController._instance.value.dispose();
            AppController._instance.reset();
        }
    }

    private readonly _isInitializing = new FlagModel(true);
    private _initializingPromise: Promise<void> | null = null;

    private readonly _network = new NetworkInterceptor();

    private readonly _auth = new AuthController();
    private readonly _users = new UserController();
    private readonly _bank = new BankController();
    private readonly _settings = new SettingsController();

    constructor() {
        super();

        this.disposer.add(this._cleanup);
        this.disposer.add(this._network);
    }

    public get isInitializing() { return this._isInitializing.value; }
    public get isDisposed() { return this._isDisposed; }

    /* @Guard  */public get Auth() { return this._auth; }
    /* @Guard  */public get Users() { return this._users; }
    /* @Guard  */public get Settings() { return this._settings; }
    /* @Guard  */public get Bank() { return this._bank; }

    /* @Guard  */public get Network() { return this._network; }

    public async initialize() {
        if (this._initializingPromise != null) {
            return this._initializingPromise;
        }

        const manualPromise = createManualPromise();
        this._initializingPromise = manualPromise.promise;

        try {
            this._isInitializing.setTrue();

            this._network.init();

            // init it first
            await this._auth.initialize();

            // this._network.addAuthData(() => this._auth.getAuthData());

            const controllers = this.getChildren();

            await Promise.all(controllers.map(x => x.initialize()));
        } finally {
            manualPromise.resolve();
            this._isInitializing.setFalse();
        }
    }

    private getChildren(): IController[] {
        return [
            this._settings,
            this._users,
            this._bank,
        ];
    }

    private _resetChildren = () => {
        const controllers = this.getChildren();

        controllers.forEach(x => x.dispose());
    };

    private _cleanup = () => {
        this._resetChildren();

        this._initializingPromise = null;
        this._isInitializing.setTrue();

        // extra cleanup for network processors
        cleanupProcessors();
    };
}
