import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { saveAs } from 'file-saver';
import { FileUploader } from 'ng2-file-upload';
import { OidcFacade } from 'ng-oidc-client';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter, take, mergeMap } from 'rxjs/operators';

import * as RemoteFileActions from './actions';
import * as remoteFileSelectors from './selectors';
import { UploadService } from '../../services/upload.service';

@Injectable()
export class RemoteFileStoreEffects {
    private readonly filenameRegex = /.*filename\=(.*);.*/;

    constructor(
        private api: UploadService,
        private actions$: Actions,
        private store$: Store,
        private oidcFacade: OidcFacade
    ) {

    }

    initializeUploaderRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoteFileActions.initializeUploaderRequest),
            withLatestFrom(this.store$.pipe(
                select(remoteFileSelectors.selectRemoteFileUploader)
            )),
            filter(([action, uploader]) => uploader === null),
            switchMap(action =>
                this.oidcFacade.identity$.pipe(
                    map(x => x.access_token),
                    map(token => {
                        if (!!token) {
                            const uploader = new FileUploader({
                                url: this.api.getAbsoluteUrl('upload/upload'),
                                authToken: `Bearer ${token}`,
                                removeAfterUpload: true,

                            });

                            return RemoteFileActions.initializeUploaderSuccess({ uploader });
                        } else {
                            return RemoteFileActions.initializeUploaderFailure({ error: 'auth token is not defined' });
                        }
                    }),
                    take(1)
                )
            )
        )
    );

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoteFileActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(remoteFileSelectors.selectAllRemoteFiles)
            )),
            filter(([action, files]) => files.length === 0),
            switchMap(action => {
                return this.api.getServerFiles()
                    .pipe(
                        map(files => RemoteFileActions.loadSuccess({ files })),
                        catchError(error => of(RemoteFileActions.loadFailure({ error })))
                    );
            })
        )
    );

    downloadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoteFileActions.downloadRequest),
            mergeMap(action => {
                const list = [].concat(action.files);

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
        )
    );

    deleteRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoteFileActions.deleteRequest),
            mergeMap(action => {
                const list = [].concat(action.files);

                return this.api
                    .deleteFiles(list)
                    .pipe(
                        map(response => RemoteFileActions.deleteSuccess({ result: response })),
                        catchError(error => of(RemoteFileActions.deleteFailure({ error })))
                    );
            })
        )
    );

    // we should probably not shove big things into state, so handle the downloaded content
    // here for now
    private saveDownload(response: HttpResponse<Blob>) {
        const disposition = response.headers.get('Content-Disposition');
        const results = this.filenameRegex.exec(disposition);
        const filename = results.length > 1 ? results[1] : 'download_file';

        saveAs(response.body, filename);
    }
}
