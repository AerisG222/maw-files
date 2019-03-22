import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, filter, tap } from 'rxjs/operators';

import { FileViewModel } from './file-view-model';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { listItemAnimation } from '../../shared/animations/animations';
import { UploadState } from '../../core/state/upload.state';
import { IFileInfo } from '../../core/models/ifile-info';
import { AuthState } from '../../core/state/auth.state';
import { LoadServerFiles, DownloadServerFiles, DeleteServerFiles } from '../../core/state/upload.actions';

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
    @Select(UploadState.getServerFiles) sourceFiles$: Observable<IFileInfo[]>;
    @Select(AuthState.getShowUsername) showUsername$: Observable<boolean>;

    constructor(private _store: Store) {

    }

    ngOnInit(): void {
        this.sourceFiles$
            .pipe(
                filter(files => !!files),
                map(files => this.generateViewModel(files)),
                tap(files => this.files = files),
                takeUntil(this._unsubscribe)
            ).subscribe();

        this._store.dispatch(new LoadServerFiles());
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    downloadSingle(file: FileViewModel) {
        this._store.dispatch(new DownloadServerFiles(file.location.relativePath));
    }

    deleteSingle(file: FileViewModel) {
        this._store.dispatch(new DeleteServerFiles(file.location.relativePath));
    }

    downloadSelected(): void {
        const list = this.getSelected();

        this._store.dispatch(new DownloadServerFiles(list));
    }

    deleteSelected(): void {
        const list = this.getSelected();

        this._store.dispatch(new DeleteServerFiles(list));
    }

    getSelected(): string[] {
        return this.files
            .filter(x => x.isChecked)
            .map(x => x.location.relativePath);
    }

    generateViewModel(files: IFileInfo[]): FileViewModel[] {
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
