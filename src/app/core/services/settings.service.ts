import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Settings } from '../models/settings.model';
import { Theme } from '../models/theme.model';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static readonly keyAuthRedirectUrl = 'authRedirectUrl';

    private static readonly keyAppTheme = 'appTheme';

    constructor(
        private _localStorage: LocalStorageService
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

        this._localStorage.store(SettingsService.keyAppTheme, settings.appTheme.name);
    }

    clearAuthRedirectUrl(): void {
        this._localStorage.clear(SettingsService.keyAuthRedirectUrl);
    }

    setAuthRedirectUrl(url: string): void {
        this._localStorage.store(SettingsService.keyAuthRedirectUrl, url);
    }

    getAuthRedirectUrl(): string {
        return <string>this._localStorage.retrieve(SettingsService.keyAuthRedirectUrl);
    }

    private getTheme(): Theme {
        const themeName = this._localStorage.retrieve(SettingsService.keyAppTheme);

        try {
            return themeName !== null ? Theme.forName(themeName) : Theme.themeDark;
        } catch {
            return Theme.themeDark;
        }
    }
}
