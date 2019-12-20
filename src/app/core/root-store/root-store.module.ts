import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgOidcClientModule } from 'ng-oidc-client';
import { Log } from 'oidc-client';

import { SettingsStoreModule } from './settings-store';
import { environment } from '../../../environments/environment';
import { RemoteFileStoreModule } from './remote-file-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
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
        NgOidcClientModule.forRoot({
            oidc_config: {
                client_id: 'maw-files',
                response_type: 'code',
                scope: 'openid profile maw_api role',
                authority: environment.authUrl,
                redirect_uri: `${environment.filesUrl}/callback.html`,
                post_logout_redirect_uri: `${environment.filesUrl}/signout-callback.html`,
                silent_redirect_uri: `${environment.filesUrl}/renew-callback.html`,
                automaticSilentRenew: true,
                filterProtocolClaims: true,
                loadUserInfo: true,
                popupWindowFeatures: 'location=no,toolbar=no,width=600,height=600,left=100,top=100'
            },
            // log: {
            //     logger: console,
            //     level: environment.production ? Log.NONE : Log.INFO
            // }
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
