import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import * as remoteFileActions from './actions';
import * as remoteFileSelectors from './selectors';
import { State } from './state';
import { UploadService } from '../../services/upload.service';
import { AuthService } from '../../services/auth-service';
import { FileUploader } from 'ng2-file-upload';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class RemoteFileStoreEffects {
    private readonly _filenameRegex = /.*filename\=(.*);.*/;

    constructor(
        private _authSvc: AuthService,
        private _api: UploadService,
        private _actions$: Actions,
        private _store$: Store<State>
    ) {

    }

    @Effect()
    initializeUploaderRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<remoteFileActions.InitializeUploaderRequestAction>(remoteFileActions.ActionTypes.INITIALIZE_UPLOADER_REQUEST),
        withLatestFrom(this._store$.pipe(
            select(remoteFileSelectors.selectRemoteFileUploader)
        )),
        filter(([action, uploader]) => uploader === null),
        map(action => {
            const token = this._authSvc.getAuthorizationHeaderValue();

            if (token == null) {
                return new remoteFileActions.InitializeUploaderFailureAction({ error: 'auth token is not defined' });
            }

            if (!!token) {
                const uploader = new FileUploader({
                    url: this._api.getAbsoluteUrl('upload/upload'),
                    authToken: token,
                    removeAfterUpload: true
                });

                return new remoteFileActions.InitializeUploaderSuccessAction({ uploader: uploader });
            }
        })
    );

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<remoteFileActions.LoadRequestAction>(remoteFileActions.ActionTypes.LOAD_REQUEST),
        withLatestFrom(this._store$.pipe(
            select(remoteFileSelectors.selectAllRemoteFiles)
        )),
        filter(([action, files]) => files.length === 0),
        switchMap(action => {
            return this._api.getServerFiles()
                .pipe(
                    map(files => new remoteFileActions.LoadSuccessAction({ files: files })),
                    catchError(error => of(new remoteFileActions.LoadFailureAction({ error })))
                );
        })
    );

    @Effect()
    downloadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<remoteFileActions.DownloadRequestAction>(remoteFileActions.ActionTypes.DOWNLOAD_REQUEST),
        switchMap(action => {
            const list = [].concat(action.payload.files);

            return this._api
                .downloadFiles(list)
                .pipe(
                    map(response => {
                        this.saveDownload(response);
                        return new remoteFileActions.DownloadSuccessAction();
                    }),
                    catchError(error => of(new remoteFileActions.DownloadFailureAction({ error: error })))
                );
        })
    );

    @Effect()
    deleteRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<remoteFileActions.DeleteRequestAction>(remoteFileActions.ActionTypes.DELETE_REQUEST),
        switchMap(action => {
            const list = [].concat(action.payload.files);

            return this._api
                .deleteFiles(list)
                .pipe(
                    map(response => new remoteFileActions.DeleteSuccessAction({ result: response })),
                    catchError(error => of(new remoteFileActions.DeleteFailureAction({ error: error })))
                );
        })
    );

    // we should probably not shove big things into state, so handle the downloaded content
    // here for now
    private saveDownload(response: HttpResponse<Blob>) {
        const disposition = response.headers.get('Content-Disposition');
        const results = this._filenameRegex.exec(disposition);
        const filename = results.length > 1 ? results[1] : 'download_file';

        saveAs(response.body, filename);
    }
}
