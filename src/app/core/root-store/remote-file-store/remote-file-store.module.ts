import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RemoteFileStoreEffects } from './effects';
import { REMOTE_FILE_FEATURE_NAME } from './feature-name';
import { remoteFileReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(REMOTE_FILE_FEATURE_NAME, remoteFileReducer),
        EffectsModule.forFeature([RemoteFileStoreEffects])
    ]
})
export class RemoteFileStoreModule { }
