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

    retrieve(key: string): any {
        const value = this.strategy.getItem(this.normalize(key));

        if (!!value) {
            // not sure why, but FF had strings wrapped in quotes, so try to accomodate this here
            if (typeof value === 'string') {
                return value.replace(/"/g, '');
            }

            return value;
        }

        return null;
    }

    store(key: string, value: any): any {
        this.strategy.setItem(this.normalize(key), value);

        return value;
    }

    clear(key?: string): void {
        if (key !== undefined) {
            this.strategy.removeItem(this.normalize(key));
        } else {
            this.strategy.clear();
        }
    }

    getStrategyName(): string {
        return this.strategy.name;
    }

    normalize(raw: string) {
        raw = this.isCaseSensitive ? raw : raw.toLowerCase();
        return `${this.prefix}${this.separator}${raw}`;
    }
}
