import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { saveAs } from 'file-saver';
import { FileUploader } from 'ng2-file-upload';
import { of } from 'rxjs';
import { switchMap, catchError, map, filter, mergeMap } from 'rxjs/operators';

import * as RemoteFileActions from './actions';
import * as remoteFileSelectors from './selectors';
import { UploadService } from '../../services/upload.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class RemoteFileStoreEffects {
    private static readonly filenameRegex = /.*filename\=(.*);.*/;

    initializeUploaderRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RemoteFileActions.initializeUploaderRequest),
            concatLatestFrom(() => this.store.select(remoteFileSelectors.selectRemoteFileUploader)),
            filter(([action, uploader]) => !!!uploader),
            map(action => {
                const token = this.authService.getAccessToken();
                if (!!token) {
                    const uploader = new FileUploader({
                        url: this.api.getAbsoluteUrl('upload/upload'),
                        authToken: `Bearer ${token}`,
                        removeAfterUpload: true
                    });

                    return RemoteFileActions.initializeUploaderSuccess({ uploader });
                } else {
                    return RemoteFileActions.initializeUploaderFailure({ error: 'auth token is not defined' });
                }
            })
        );
    });

    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RemoteFileActions.loadRequest),
            concatLatestFrom(() => this.store.select(remoteFileSelectors.selectAllRemoteFiles)),
            filter(([action, files]) => files.length === 0),
            switchMap(action => {
                return this.api.getServerFiles()
                    .pipe(
                        map(files => RemoteFileActions.loadSuccess({ files })),
                        catchError(error => of(RemoteFileActions.loadFailure({ error })))
                    );
            })
        );
    });

    downloadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RemoteFileActions.downloadRequest),
            mergeMap(action => {
                let list: string[] = [];

                list = list.concat(action.files);

                return this.api
                    .downloadFiles(list)
                    .pipe(
                        map(response => {
                            this.saveDownload(response);
                            return RemoteFileActions.downloadSuccess();
                        }),
                        catchError(error => of(RemoteFileActions.downloadFailure({ error })))
                    );
            })
        );
    });

    deleteRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RemoteFileActions.deleteRequest),
            mergeMap(action => {
                let list: string[] = [];

                list = list.concat(action.files);

                return this.api
                    .deleteFiles(list)
                    .pipe(
                        map(response => RemoteFileActions.deleteSuccess({ result: response })),
                        catchError(error => of(RemoteFileActions.deleteFailure({ error })))
                    );
            })
        );
    });

    constructor(
        private api: UploadService,
        private actions$: Actions,
        private authService: AuthService,
        private store: Store
    ) {

    }

    // we should probably not shove big things into state, so handle the downloaded content
    // here for now
    private saveDownload(response: HttpResponse<Blob>): void {
        const disposition = response.headers.get('Content-Disposition');

        if (!!disposition) {
            const results = RemoteFileStoreEffects.filenameRegex.exec(disposition);

            if (!!results) {
                const filename = results.length > 1 ? results[1] : 'download_file';

                saveAs(response.body as Blob, filename);
            }
        }
    }
}
