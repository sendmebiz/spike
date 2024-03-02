import { Disposer } from '@zajno/common/functions/disposer';
import { LogicModel } from './logicModel';
import { IController } from './types';

export abstract class BaseController extends LogicModel implements IController {

    protected readonly disposer = new Disposer();

    public async initialize() {
        this.dispose();
        await this.runAction(async () => {
            await this.onInitialize();
        }, this.logInit ? 'initialize' : undefined);
        return this;
    }

    protected get logInit() { return false; }

    protected onInitialize(): void | Promise<void> {
        // no-op
    }

    /** will be called on initialize! */
    public dispose() {
        this.disposer.dispose();
    }
}
