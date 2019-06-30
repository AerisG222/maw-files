import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AuthInterceptor } from './services/auth-interceptor';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { RootStoreModule } from './root-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot({ prefix: 'maw-files' }),
        RootStoreModule
    ],
    providers: [
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
