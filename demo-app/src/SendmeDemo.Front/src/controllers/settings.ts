import { Apis, callApi } from '@/services/api';
import { BaseController } from './core/base';
import { AppSettings } from '@/services/api/endpoints/dtos/settings';

export class SettingsController extends BaseController {

    private _settings: AppSettings | null = null;

    public get settings() { return this._settings!; }

    protected async onInitialize() {
        this._settings = await callApi(Apis.Settings.Get, null);
        this.logger.log('Settings loaded', this._settings);
    }

}
