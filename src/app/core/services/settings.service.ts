import { Injectable } from '@angular/core';

import { Settings } from '../models/settings.model';
import { Theme } from '../models/theme.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyAuthRedirectUrl = 'authRedirectUrl';
    private static readonly keyAppTheme = 'appTheme';

    constructor(
        private localStorage: LocalStorageService
    ) {

    }

    load(): Settings {
        return {
            appTheme: this.getTheme()
        };
    }

    save(settings: Settings) {
        if (!settings) {
            return;
        }

        this.setValue(SettingsService.keyAppTheme, settings.appTheme.name);
    }

    clearAuthRedirectUrl(): void {
        this.clearValue(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this.setValue(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        return this.getValue(SettingsService.keyAuthRedirectUrl);
    }

    private getTheme(): Theme {
        const themeName = this.getValue(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }

    private getValue(key: string): string {
        return this.localStorage.retrieve(key) as string;
    }

    private setValue(key: string, value: any) {
        this.localStorage.store(key, value);
    }

    private clearValue(key: string) {
        this.localStorage.clear(key);
    }
}
