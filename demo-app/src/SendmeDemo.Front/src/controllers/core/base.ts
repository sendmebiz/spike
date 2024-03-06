import { Disposer } from '@zajno/common/functions/disposer';
import { LogicModel } from './logicModel';
import { IController } from './types';

export abstract class BaseController extends LogicModel implements IController {

    protected readonly disposer = new Disposer();

    private _isInitialized = false;

    protected get isInitialized() { return this._isInitialized; }

    public async initialize() {
        this.dispose();
        await this.runAction(async () => {
            await this.onInitialize();
        }, this.logInit ? 'initialize' : undefined);
        this._isInitialized = true;
        return this;
    }

    protected get logInit() { return false; }

    protected onInitialize(): void | Promise<void> {
        // no-op
    }

    /** will be called on initialize! */
    public dispose() {
        this._isInitialized = false;
        this.disposer.dispose();
    }
}
