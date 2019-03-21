import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FileListingComponent } from './file-listing/file-listing.component';
import { UploadComponent } from './upload/upload.component';
import { DownloadHandlerComponent } from './download-handler/download-handler.component';
import { FileThumbnailComponent } from './file-thumbnail/file-thumbnail.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FileUploadModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        SharedModule
    ],
    declarations: [
        // components
        AppComponent,
        FileListingComponent,
        HomeComponent,
        UploadComponent,
        DownloadHandlerComponent,
        FileThumbnailComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
