import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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

        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule
    ],
    exports: [
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
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
