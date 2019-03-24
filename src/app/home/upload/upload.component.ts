import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { listItemAnimation } from '../../shared/animations/animations';
import { RootStoreState, RemoteFileStoreSelectors } from '../../core/root-store';
import { InitializeUploaderRequestAction } from '../../core/root-store/remote-file-store/actions';
import { tap, filter } from 'rxjs/operators';

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
    columnsToDisplay = [ 'name', 'size', 'progress', 'status', 'upload', 'cancel', 'remove' ];
    uploader$: Observable<FileUploader>;

    @ViewChild('uploadTable') uploadTable: MatTable<FileItem>;

    constructor(
        private _store: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.uploader$ = this._store.pipe(
            select(RemoteFileStoreSelectors.selectRemoteFileUploader),
            filter(uploader => !!uploader),
            tap(uploader => this.trackChanges(uploader))
        );

        this._store.dispatch(new InitializeUploaderRequestAction());
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    trackByFile(index, item) {
        return item.file.name;
    }

    private trackChanges(uploader: FileUploader): void {
        uploader.onAfterAddingAll = () => this.updateTable();
        uploader.onAfterAddingFile = () => this.updateTable();
        uploader.onCancelItem = () => this.updateTable();
        uploader.onCompleteAll = () => this.updateTable();
        uploader.onCompleteItem = () => this.updateTable();
        uploader.onErrorItem = () => this.updateTable();
        uploader.onProgressAll = () => this.updateTable();
        uploader.onProgressItem = () => this.updateTable();
        uploader.onSuccessItem = () => this.updateTable();
    }

    private updateTable(): void {
        this.uploadTable.renderRows();
    }
}
