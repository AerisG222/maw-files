import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { listItemAnimation } from '../../shared/animations/animations';
import { RootStoreState, RemoteFileStoreSelectors } from '../../core/root-store';
import { InitializeUploaderRequestAction } from '../../core/root-store/remote-file-store/actions';

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
    columnsToDisplay = [ 'name', 'size', 'progress', 'status', 'actions' ];
    uploader$: Observable<FileUploader>;

    constructor(
        private _store: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.uploader$ = this._store.pipe(
            select(RemoteFileStoreSelectors.selectRemoteFileUploader)
        );

        this._store.dispatch(new InitializeUploaderRequestAction());
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    trackByFile(index, item) {
        return item.file.name;
    }
}
