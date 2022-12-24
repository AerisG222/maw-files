import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './pipes/file-size.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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
