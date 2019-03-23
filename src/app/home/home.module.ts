import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FileListingComponent } from './file-listing/file-listing.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { FileThumbnailComponent } from './file-thumbnail/file-thumbnail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        FileListingComponent,
        FileThumbnailComponent,
        HomeComponent,
        UploadComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
