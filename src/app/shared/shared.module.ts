import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';
import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule
} from '@angular/material';

@NgModule({
    declarations: [
        FileSizePipe,
        RelativeDatePipe,

        DownloadHandlerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule
    ],
    exports: [
        FileUploadModule,
        FormsModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,

        FileSizePipe,
        RelativeDatePipe,

        DownloadHandlerComponent
    ]
})
export class SharedModule { }
