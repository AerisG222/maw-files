import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
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
        ReactiveFormsModule,

        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule
    ],
    exports: [
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,

        FileSizePipe,
        RelativeDatePipe,

        DownloadHandlerComponent
    ]
})
export class SharedModule { }
