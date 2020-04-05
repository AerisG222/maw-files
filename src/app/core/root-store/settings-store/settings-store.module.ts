import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SETTINGS_FEATURE_NAME } from './feature-name';
import { SettingsStoreEffects } from './effects';
import { settingsReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(SETTINGS_FEATURE_NAME, settingsReducer),
        EffectsModule.forFeature([SettingsStoreEffects])
    ]
})
export class SettingsStoreModule { }
