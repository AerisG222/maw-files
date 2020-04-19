import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { RootStoreModule } from './root-store';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [ environment.apiUrl ],
                sendAccessToken: true
            }
        }),
        RootStoreModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
