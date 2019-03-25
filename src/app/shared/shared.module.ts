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
import { HomeLinkComponent } from './home-link/home-link.component';
import { HelpLinkComponent } from './help-link/help-link.component';
import { SettingsLinkComponent } from './settings-link/settings-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        FileSizePipe,
        RelativeDatePipe,

        DownloadHandlerComponent,
        HomeLinkComponent,
        HelpLinkComponent,
        SettingsLinkComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

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

        DownloadHandlerComponent,
        HomeLinkComponent,
        HelpLinkComponent,
        SettingsLinkComponent
    ]
})
export class SharedModule { }
