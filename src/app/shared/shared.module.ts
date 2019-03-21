import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';

@NgModule({
    declarations: [
        FileSizePipe,
        RelativeDatePipe,

        DownloadHandlerComponent,
        SvgIconComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        FileUploadModule,
        FormsModule,

        FileSizePipe,
        RelativeDatePipe,

        DownloadHandlerComponent,
        SvgIconComponent
    ]
})
export class SharedModule { }
