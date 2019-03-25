import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { MobileViewComponent } from '../mobile/mobile-view/mobile-view.component';

@NgModule({
    declarations: [
        MobileViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        MobileViewComponent
    ]
})
export class MobileModule { }
