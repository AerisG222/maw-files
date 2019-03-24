import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class FileListingComponent implements OnInit, OnDestroy {
    private _unsubscribe: Subject<void> = new Subject();
    files: FileViewModel[] = [];
    sourceFiles$: Observable<FileInfo[]>;
    showUsername: boolean;
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

    ngOnInit(): void {
        this.sourceFiles$ = this._store
            .pipe(
                select(RemoteFileStoreSelectors.selectAllRemoteFiles),
                filter(files => !!files),
                map(files => this.generateViewModel(files)),
                tap(files => this.files = files),
                takeUntil(this._unsubscribe)
            );

        this.showUsername = this._authSvc.isAdmin();

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

    generateViewModel(files: FileInfo[]): FileViewModel[] {
        const result = [];

        for (const file of files) {
            result.push(new FileViewModel(file.location,
                file.creationTime,
                file.sizeInBytes)
            );
        }

        return result;
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
