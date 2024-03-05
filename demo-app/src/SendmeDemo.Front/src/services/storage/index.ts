import { IStorage } from '@zajno/common/storage/abstractions';
import { LocalStorage as LocalStorageService } from './local';

export const LocalStorage: IStorage = new LocalStorageService();

// TODO
export const SecureStorage: IStorage = LocalStorage;
