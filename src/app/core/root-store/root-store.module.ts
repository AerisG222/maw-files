import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SettingsStoreModule } from './settings-store';
import { environment } from '../../../environments/environment';
import { RemoteFileStoreModule } from './remote-file-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RemoteFileStoreModule,
        SettingsStoreModule,
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
