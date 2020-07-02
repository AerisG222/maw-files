import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RemoteFileStoreEffects } from './effects';
import { REMOTE_FILE_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(REMOTE_FILE_FEATURE_NAME, reducer),
        EffectsModule.forFeature([RemoteFileStoreEffects])
    ]
})
export class RemoteFileStoreModule { }
