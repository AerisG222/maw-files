import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, filter, tap } from 'rxjs/operators';

import { FileViewModel } from './file-view-model';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { listItemAnimation } from '../../shared/animations/animations';
import { FileInfo } from '../../core/models/file-info';
import { AuthService } from '../../core/services/auth-service';
import { RootStoreState, RemoteFileStoreSelectors } from '../../core/root-store';
import { DownloadRequestAction, DeleteRequestAction, LoadRequestAction} from '../../core/root-store/remote-file-store/actions';
import { MatTable } from '@angular/material';

@Component({
    selector: 'app-file-listing',
    templateUrl: './file-listing.component.html',
    styleUrls: ['./file-listing.component.scss'],
    providers: [
        FileSizePipe,
        RelativeDatePipe
    ],
    animations: [
        listItemAnimation
    ]
})
export class FileListingComponent implements AfterViewInit, OnDestroy {
    private _unsubscribe: Subject<void> = new Subject();

    @ViewChild('fileTable') fileTable: MatTable<FileViewModel>;

    files: FileViewModel[] = [];
    columnsToDisplay = [];

    constructor(
        private _store: Store<RootStoreState.State>,
        private _authSvc: AuthService
    ) {
        this.columnsToDisplay.push('thumbnail');

        if (this._authSvc.isAdmin()) {
            this.columnsToDisplay.push('user');
        }

        this.columnsToDisplay = [...this.columnsToDisplay, 'filename', 'uploaded', 'size', 'download', 'delete', 'check' ];
    }

    ngAfterViewInit(): void {
        this._store
            .pipe(
                select(RemoteFileStoreSelectors.selectAllRemoteFiles),
                filter(files => !!files),
                tap(files => this.updateViewModel(files)),
                takeUntil(this._unsubscribe)
            ).subscribe();

        this._store.dispatch(new LoadRequestAction());
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    downloadSingle(file: FileViewModel) {
        this._store.dispatch(new DownloadRequestAction({ files: file.location.relativePath }));
    }

    deleteSingle(file: FileViewModel) {
        this._store.dispatch(new DeleteRequestAction({ files: file.location.relativePath }));
    }

    downloadSelected(): void {
        const list = this.getSelected();

        this._store.dispatch(new DownloadRequestAction({ files: list }));
    }

    deleteSelected(): void {
        const list = this.getSelected();

        this._store.dispatch(new DeleteRequestAction({ files: list }));
    }

    getSelected(): string[] {
        return this.files
            .filter(x => x.isChecked)
            .map(x => x.location.relativePath);
    }

    updateViewModel(files: FileInfo[]): void {
        for (const file of files) {
            if (!this.files.some((f, i) => f.location.relativePath === file.location.relativePath)) {
                this.files.push(new FileViewModel(file.location,
                    file.creationTime,
                    file.sizeInBytes)
                );

                this.fileTable.renderRows();
            }
        }
    }

    toggleFiles(isChecked): void {
        this.files.forEach(x => {
            x.isChecked = isChecked;
        });
    }

    trackByFile(index, item): number {
        return item.location.relativePath;
    }
}
