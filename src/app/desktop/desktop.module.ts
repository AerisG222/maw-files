import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { DesktopViewComponent } from '../desktop/desktop-view/desktop-view.component';

@NgModule({
    declarations: [
        DesktopViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        DesktopViewComponent
    ]
})
export class DesktopModule { }
