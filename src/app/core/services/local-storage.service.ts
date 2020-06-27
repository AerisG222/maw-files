import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private readonly prefix = 'maw-files';
    private readonly separator = '|';
    private readonly isCaseSensitive = false;
    private strategy: Storage;

    constructor() {
        this.strategy = window.localStorage;
    }

    getString(key: string, def: string): string {
        const val = this.get(key);

        return val ?? def;
    }

    getStringOrNull(key: string): string | null {
        const val = this.get(key);

        return val;
    }

    setString(key: string, value: string): void {
        this.set(key, value);
    }

    clear(key?: string): void {
        if (!!key) {
            this.strategy.removeItem(this.normalize(key));
        } else {
            this.strategy.clear();
        }
    }

    private get(key: string): string | null {
        return this.strategy.getItem(this.normalize(key));
    }

    private set(key: string, value: string): void {
        this.strategy.setItem(this.normalize(key), value);
    }

    private normalize(raw: string): string {
        raw = this.isCaseSensitive ? raw : raw.toLowerCase();
        return `${this.prefix}${this.separator}${raw}`;
    }
}
