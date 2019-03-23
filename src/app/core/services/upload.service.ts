import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

import { FileInfo } from '../models/file-info';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileOperationResult } from '../models/file-operation-result';
import { EnvironmentConfig } from '../models/environment-config';
import { RootStoreState } from '../root-store';
import { AuthService } from './auth-service';
import { FileAddedAction, FileDeletedAction } from '../root-store/remote-file-store/actions';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private _hubReady$ = new BehaviorSubject<signalR.HubConnection>(undefined);

    constructor(private _cfg: EnvironmentConfig,
                private _http: HttpClient,
                private _authSvc: AuthService,
                private _store: Store<RootStoreState.State>,
                private _zone: NgZone) {

    }

    getServerFiles(): Observable<FileInfo[]> {
        this.ensureHubConnected();

        return this._hubReady$
            .pipe(
                filter(hub => !!hub === true),
                switchMap(hub => from(hub.invoke('GetAllFiles')))
            );
    }

    deleteFiles(files: string[]): Observable<FileOperationResult[]> {
        if (!!files === false || files.length === 0) {
            return;
        }

        return this._hubReady$
            .pipe(
                filter(hub => !!hub === true),
                switchMap(hub => from(hub.invoke('DeleteFiles', files)))
            );
    }

    downloadFiles(files: string[]): Observable<HttpResponse<Blob>> {
        if (!!files === false || files.length === 0) {
            return;
        }

        const url = this.getAbsoluteUrl('upload/download');

        return this._http
            .post(url, files, { responseType: 'blob', observe: 'response' });
    }

    loadThumbnail(relativeUrl: string) {
        const url = this.getThumbnailUrl(relativeUrl);

        return this._http
            .get(url, {responseType: 'blob'})
            .pipe(
                map(e => URL.createObjectURL(e))
            );
    }

    getAbsoluteUrl(relativeUrl: string) {
        return `${this._cfg.apiUrl}/${relativeUrl}`;
    }

    private getThumbnailUrl(relativeUrl: string) {
        return this.getAbsoluteUrl(`upload/thumbnail/${encodeURIComponent(relativeUrl)}`);
    }

    // TODO: determine if there is a more reactive way to get the hub connection
    // when we tried to do this the first time, by using the @Select getUser to get the
    // user, this did not work, because this service was created before the others, and we
    // never got the user coming through after subscribing.  we now assume that our method
    // is called only after auth, and we should have a valid user instance to pull from state
    // (which should be populated after our constructor completes)
    private async ensureHubConnected() {
        if (!!this._hubReady$.value === true) {
            return;
        }

        await this.setupSignalrHub(this._authSvc.getAuthorizationToken());
    }

    private async setupSignalrHub(token: string) {
        console.log('setting up signalr hub...');

        const tokenValue = `?token=${token}`;
        const url = `${this.getAbsoluteUrl('uploadr')}${tokenValue}`;

        const hub = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(LogLevel.Information)
            // TODO: enable message pack once it supports camel casing
            // .withHubProtocol(new MessagePackHubProtocol())
            .build();

        hub.on('FileAdded', (addedFile: FileInfo) => {
            console.log('file added: ', addedFile);

            this._zone.run(() => this._store.dispatch(new FileAddedAction({ file: addedFile })));
        });

        hub.on('FileDeleted', (deletedFile: FileInfo) => {
            console.log('file deleted: ', deletedFile);

            this._zone.run(() => this._store.dispatch(new FileDeletedAction({ file: deletedFile })));
        });

        hub.start()
            .then(() => this._hubReady$.next(hub))
            .catch(err => console.error(err.toString()));
    }
}
