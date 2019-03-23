import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AuthInterceptor } from './services/auth-interceptor';
import { EnvironmentConfig } from './models/environment-config';
import { AuthConfig } from './models/auth-config';
import { AuthState } from './state/auth.state';
import { UploadState } from './state/upload.state';
import { environment } from '../../environments/environment';
import { throwIfAlreadyLoaded } from './module-import.guard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        NgxsModule.forRoot([
            AuthState,
            UploadState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        }),
        NgxsLoggerPluginModule.forRoot({
            disabled: environment.production
        }),
    ],
    providers: [
        EnvironmentConfig,
        {
            provide: AuthConfig,
            useFactory: (env: EnvironmentConfig) => {
                return new AuthConfig(
                    env.authUrl,
                    'maw-files',
                    env.filesUrl,
                    `${env.filesUrl}/auth`,
                    `${env.filesUrl}/auth/silent`
                );
            },
            deps: [ EnvironmentConfig ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
