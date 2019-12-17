import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { FileInfo } from '../models/file-info';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileOperationResult } from '../models/file-operation-result';
import * as RemoteFileStoreActions from '../root-store/remote-file-store/actions';
import { environment } from 'src/environments/environment';
import { OidcFacade } from 'ng-oidc-client';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private hubReady$ = new BehaviorSubject<signalR.HubConnection>(undefined);

    constructor(private http: HttpClient,
                private store: Store<{}>,
                private oidcFacade: OidcFacade,
                private zone: NgZone) {

    }

    getServerFiles(): Observable<FileInfo[]> {
        this.ensureHubConnected();

        return this.hubReady$
            .pipe(
                filter(hub => !!hub === true),
                switchMap(hub => from(hub.invoke('GetAllFiles')))
            );
    }

    deleteFiles(files: string[]): Observable<FileOperationResult[]> {
        if (!!files === false || files.length === 0) {
            return;
        }

        return this.hubReady$
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

        return this.http
            .post(url, files, { responseType: 'blob', observe: 'response' });
    }

    loadThumbnail(relativeUrl: string) {
        const url = this.getThumbnailUrl(relativeUrl);

        return this.http
            .get(url, {responseType: 'blob'})
            .pipe(
                map(e => URL.createObjectURL(e))
            );
    }

    getAbsoluteUrl(relativeUrl: string) {
        return `${environment.apiUrl}/${relativeUrl}`;
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
        if (!!this.hubReady$.value === true) {
            return;
        }

        await this.oidcFacade.identity$
            .pipe(
                map(user => user.access_token),
                switchMap(token => this.setupSignalrHub(token))
            ).toPromise();
    }

    private async setupSignalrHub(token: string) {
        console.log('setting up signalr hub...');

        const tokenValue = `?token=${token}`;
        const url = `${this.getAbsoluteUrl('uploadr')}${tokenValue}`;

        const hub = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            // TODO: enable message pack once it supports camel casing
            // .withHubProtocol(new MessagePackHubProtocol())
            .build();

        hub.on('FileAdded', (addedFile: FileInfo) => {
            console.log('file added: ', addedFile);

            this.zone.run(() => this.store.dispatch(RemoteFileStoreActions.fileAdded({ file: addedFile })));
        });

        // tslint:disable-next-line: ngrx-avoid-dispatching-multiple-actions-sequentially
        hub.on('FileDeleted', (deletedFile: FileInfo) => {
            console.log('file deleted: ', deletedFile);

            this.zone.run(() => this.store.dispatch(RemoteFileStoreActions.fileDeleted({ file: deletedFile })));
        });

        hub.start()
            .then(() => this.hubReady$.next(hub))
            .catch(err => console.error(err.toString()));
    }
}
