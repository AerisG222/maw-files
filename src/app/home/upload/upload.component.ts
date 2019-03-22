import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { listItemAnimation } from '../../shared/animations/animations';
import { UploadState } from '../../core/state/upload.state';
import { InitializeUploader } from '../../core/state/upload.actions';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [
        FileSizePipe
    ],
    animations: [
        listItemAnimation
    ]
})
export class UploadComponent implements OnInit {
    hasBaseDropZoneOver = false;

    @Select(UploadState.getUploader) uploader$: Observable<FileUploader>;

    constructor(private _store: Store) {

    }

    ngOnInit() {
        this._store.dispatch(new InitializeUploader());
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    trackByFile(index, item) {
        return item.file.name;
    }
}
