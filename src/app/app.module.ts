import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { AuthStoreManagerService } from './services/auth-store-manager.service';
import { HomeComponent } from './home/home.component';
import { FileListingComponent } from './file-listing/file-listing.component';
import { UploadComponent } from './upload/upload.component';
import { environment } from '../environments/environment';
import { UploadState } from './state/upload.state';
import { AuthState } from './state/auth.state';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';
import { FileThumbnailComponent } from './file-thumbnail/file-thumbnail.component';
import { AuthService } from './services/auth-service';
import { EnvironmentConfig } from './models/environment-config';
import { AuthConfig } from './models/auth-config';
import { AuthInterceptor } from './services/auth-interceptor';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FileUploadModule,
        FormsModule,
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
        AppRoutingModule
    ],
    declarations: [
        // pipes
        FileSizePipe,
        RelativeDatePipe,

        // components
        AppComponent,
        FileListingComponent,
        HomeComponent,
        UploadComponent,
        DownloadHandlerComponent,
        FileThumbnailComponent,
        SvgIconComponent
    ],
    providers: [
        AuthService,
        AuthStoreManagerService,
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
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
