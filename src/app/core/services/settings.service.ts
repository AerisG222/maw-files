import { Injectable } from '@angular/core';

import { Settings } from '../models/settings.model';
import { Theme } from '../models/theme.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {
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

    save(settings: Settings): void {
        if (!settings) {
            return;
        }

        this.localStorage.setString(SettingsService.keyAppTheme, settings.appTheme.name);
    }

    private getTheme(): Theme {
        const themeName = this.localStorage.getStringOrNull(SettingsService.keyAppTheme);

        return Theme.forName(themeName);
    }
}
