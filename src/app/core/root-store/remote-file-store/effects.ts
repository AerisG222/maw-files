import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter, take, tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import * as remoteFileActions from './actions';
import * as remoteFileSelectors from './selectors';
import { State } from './state';
import { UploadService } from '../../services/upload.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpResponse } from '@angular/common/http';
import { OidcFacade } from 'ng-oidc-client';

@Injectable()
export class RemoteFileStoreEffects {
    private readonly filenameRegex = /.*filename\=(.*);.*/;

    constructor(
        private api: UploadService,
        private actions$: Actions,
        private store$: Store<State>,
        private oidcFacade: OidcFacade
    ) {

    }

    @Effect()
    initializeUploaderRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<remoteFileActions.InitializeUploaderRequestAction>(remoteFileActions.ActionTypes.INITIALIZE_UPLOADER_REQUEST),
        withLatestFrom(this.store$.pipe(
            select(remoteFileSelectors.selectRemoteFileUploader)
        )),
        filter(([action, uploader]) => uploader === null),
        switchMap(action =>
            this.oidcFacade.identity$.pipe(
                map(x => x.access_token),
                map(token => {
                    if (token == null) {
                        return new remoteFileActions.InitializeUploaderFailureAction({ error: 'auth token is not defined' });
                    }

                    if (!!token) {
                        const uploader = new FileUploader({
                            url: this.api.getAbsoluteUrl('upload/upload'),
                            authToken: token,
                            removeAfterUpload: true
                        });

                        return new remoteFileActions.InitializeUploaderSuccessAction({ uploader });
                    }
                }),
                take(1)
            )
        )
    );

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<remoteFileActions.LoadRequestAction>(remoteFileActions.ActionTypes.LOAD_REQUEST),
        withLatestFrom(this.store$.pipe(
            select(remoteFileSelectors.selectAllRemoteFiles)
        )),
        filter(([action, files]) => files.length === 0),
        switchMap(action => {
            return this.api.getServerFiles()
                .pipe(
                    map(files => new remoteFileActions.LoadSuccessAction({ files })),
                    catchError(error => of(new remoteFileActions.LoadFailureAction({ error })))
                );
        })
    );

    @Effect()
    downloadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<remoteFileActions.DownloadRequestAction>(remoteFileActions.ActionTypes.DOWNLOAD_REQUEST),
        switchMap(action => {
            const list = [].concat(action.payload.files);

            return this.api
                .downloadFiles(list)
                .pipe(
                    map(response => {
                        this.saveDownload(response);
                        return new remoteFileActions.DownloadSuccessAction();
                    }),
                    catchError(error => of(new remoteFileActions.DownloadFailureAction({ error })))
                );
        })
    );

    @Effect()
    deleteRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<remoteFileActions.DeleteRequestAction>(remoteFileActions.ActionTypes.DELETE_REQUEST),
        switchMap(action => {
            const list = [].concat(action.payload.files);

            return this.api
                .deleteFiles(list)
                .pipe(
                    map(response => new remoteFileActions.DeleteSuccessAction({ result: response })),
                    catchError(error => of(new remoteFileActions.DeleteFailureAction({ error })))
                );
        })
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
