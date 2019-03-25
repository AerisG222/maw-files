import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LAYOUT_FEATURE_NAME } from './feature-name';
import { LayoutStoreEffects } from './effects';
import { layoutReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        StoreModule.forFeature(LAYOUT_FEATURE_NAME, layoutReducer),
        EffectsModule.forFeature([LayoutStoreEffects])
    ],
    providers: [
        LayoutStoreEffects
    ]
})
export class LayoutStoreModule { }
