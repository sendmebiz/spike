import { IStorage } from '@zajno/common/storage/abstractions';

export class LocalStorage implements IStorage {

    getValue(key: string): Promise<string | null> {
        return Promise.resolve(window.localStorage.getItem(key));
    }

    async setValue(key: string, value: string): Promise<void> {
        window.localStorage.setItem(key, value);
    }

    async hasValue(key: string): Promise<boolean> {
        const res = await this.getValue(key);
        return res != null;
    }

    async remove(key: string): Promise<void> {
        window.localStorage.removeItem(key);
    }
}
