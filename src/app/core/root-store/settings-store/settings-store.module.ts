import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SETTINGS_FEATURE_NAME } from './feature-name';
import { SettingsStoreEffects } from './effects';
import { settingsReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(SETTINGS_FEATURE_NAME, settingsReducer),
        EffectsModule.forFeature([SettingsStoreEffects])
    ],
    providers: [
        SettingsStoreEffects
    ]
})
export class SettingsStoreModule { }
