import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';

@NgModule({
    declarations: [
        FileSizePipe,
        RelativeDatePipe,

        SvgIconComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FileSizePipe,
        RelativeDatePipe,

        SvgIconComponent
    ]
})
export class SharedModule { }
