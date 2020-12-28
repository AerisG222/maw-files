import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { SettingsStoreModule } from './settings-store';
import { RemoteFileStoreModule } from './remote-file-store';
import { AuthStoreModule } from './auth-store';
import { extModules } from './environment/modules';

@NgModule({
    declarations: [],
    imports: [
        AuthStoreModule,
        RemoteFileStoreModule,
        SettingsStoreModule,
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal
        }),
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: false,  // we currently pump the file uploader through ngrx, so cant check immutability
                strictActionImmutability: false,
                strictStateSerializability: false,
                strictActionSerializability: false
            }
        }),
        EffectsModule.forRoot([]),
        extModules
    ]
})
export class RootStoreModule { }
