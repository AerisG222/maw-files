import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, tap, map, take } from 'rxjs/operators';

import { FileViewModel } from './file-view-model';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { listItemAnimation } from '../../shared/animations/animations';
import { FileInfo } from '../../core/models/file-info';
import { RemoteFileStoreSelectors, RemoteFileStoreActions } from '../../core/root-store';
import { AuthStoreSelectors } from 'src/app/core/root-store/auth-store';

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
    @ViewChild('fileTable') fileTable: MatTable<FileViewModel> | null = null;

    files: FileViewModel[] = [];
    columnsToDisplay: string[] = [];

    private destroySub = new Subscription();

    constructor(
        private store$: Store
    ) {
        this.store$.pipe(
            select(AuthStoreSelectors.selectIsAdmin),
            tap(isAdmin => {
                this.columnsToDisplay.push('thumbnail');

                if (isAdmin) {
                    this.columnsToDisplay.push('user');
                }

                this.columnsToDisplay = [...this.columnsToDisplay, 'filename', 'uploaded', 'size', 'download', 'delete', 'check' ];
            }),
            take(1)
        )
        .subscribe();
    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(RemoteFileStoreSelectors.selectAllRemoteFiles),
                filter(files => !!files),
                tap(files => this.updateViewModel(files))
            ).subscribe()
        );

        this.store$.dispatch(RemoteFileStoreActions.loadRequest());
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    downloadSingle(file: FileViewModel): void {
        this.store$.dispatch(RemoteFileStoreActions.downloadRequest({ files: file.location.relativePath }));
    }

    deleteSingle(file: FileViewModel): void {
        this.store$.dispatch(RemoteFileStoreActions.deleteRequest({ files: file.location.relativePath }));
    }

    downloadSelected(): void {
        const list = this.getSelected();

        this.store$.dispatch(RemoteFileStoreActions.downloadRequest({ files: list }));
    }

    deleteSelected(): void {
        const list = this.getSelected();

        this.store$.dispatch(RemoteFileStoreActions.deleteRequest({ files: list }));
    }

    getSelected(): string[] {
        return this.files
            .filter(x => x.isChecked)
            .map(x => x.location.relativePath);
    }

    updateViewModel(files: FileInfo[]): void {
        // if display table does not have a file in source, add it
        for (const file of files) {
            if (!this.files.some((f, i) => f.location.relativePath === file.location.relativePath)) {
                this.files.push(new FileViewModel(file.location,
                    file.creationTime,
                    file.sizeInBytes)
                );

                this.updateTable();
            }
        }

        const toRemove = [];

        // if display table has file not in source, remove it
        for (const file of this.files) {
            if (!files.some((f, i) => f.location.relativePath === file.location.relativePath)) {
                toRemove.push(file);
            }
        }

        for (const file of toRemove) {
            const index = this.files.indexOf(file, 0);

            if (index > -1) {
                this.files.splice(index, 1);

                this.updateTable();
            }
        }
    }

    toggleFiles(isChecked: boolean): void {
        this.files.forEach(x => {
            x.isChecked = isChecked;
        });
    }

    private updateTable(): void {
        if (!!this.fileTable) {
            this.fileTable.renderRows();
        }
    }
}
