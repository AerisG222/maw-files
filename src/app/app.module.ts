import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DesktopViewModule } from './desktop-view/desktop-view.module';
import { MobileViewModule } from './mobile-view/mobile-view.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        DesktopViewModule,
        MobileViewModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
