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

        this.localStorage.store(SettingsService.keyAppTheme, settings.appTheme.name);
    }

    clearAuthRedirectUrl(): void {
        this.localStorage.clear(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this.localStorage.store(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        return this.localStorage.retrieve(SettingsService.keyAuthRedirectUrl) as string;
    }

    private getTheme(): Theme {
        const themeName = this.localStorage.retrieve(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }
}
