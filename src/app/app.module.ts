import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DesktopModule } from './desktop/desktop.module';
import { MobileModule } from './mobile/mobile.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        DesktopModule,
        MobileModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
