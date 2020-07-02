import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AUTH_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';
import { AuthStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(AUTH_FEATURE_NAME, reducer),
        EffectsModule.forFeature([AuthStoreEffects])
    ]
})
export class AuthStoreModule { }
