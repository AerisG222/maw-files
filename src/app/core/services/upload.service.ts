import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { FileInfo } from '../models/file-info';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileOperationResult } from '../models/file-operation-result';
import * as RemoteFileStoreActions from '../root-store/remote-file-store/actions';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private hub?: signalR.HubConnection;

    constructor(private http: HttpClient,
                private store: Store,
                private authService: AuthService,
                private zone: NgZone) {

    }

    getServerFiles(): Observable<FileInfo[]> {
        this.ensureHubConnected();

        if (!!this.hub) {
            return from(this.hub.invoke('GetAllFiles'));
        }

        return of([]);
    }

    deleteFiles(files: string[]): Observable<FileOperationResult[]> {
        if (!!files && files.length > 0 && !!this.hub) {
            return from(this.hub.invoke('DeleteFiles', files));
        }

        return of([]);
    }

    downloadFiles(files: string[]): Observable<HttpResponse<Blob>> {
        if (!!files && files.length > 0) {
            const url = this.getAbsoluteUrl('upload/download');

            return this.http
                .post(url, files, { responseType: 'blob', observe: 'response' });
        }

        throw new Error('no files to delete');
    }

    loadThumbnail(relativeUrl: string): Observable<string> {
        const url = this.getThumbnailUrl(relativeUrl);

        return this.http
            .get(url, {responseType: 'blob'})
            .pipe(
                map(e => URL.createObjectURL(e))
            );
    }

    getAbsoluteUrl(relativeUrl: string): string {
        return `${environment.apiUrl}/${relativeUrl}`;
    }

    private getThumbnailUrl(relativeUrl: string): string {
        return this.getAbsoluteUrl(`upload/thumbnail/${encodeURIComponent(relativeUrl)}`);
    }

    // TODO: determine if there is a more reactive way to get the hub connection
    // when we tried to do this the first time, by using the @Select getUser to get the
    // user, this did not work, because this service was created before the others, and we
    // never got the user coming through after subscribing.  we now assume that our method
    // is called only after auth, and we should have a valid user instance to pull from state
    // (which should be populated after our constructor completes)
    private ensureHubConnected(): void {
        if (!!this.hub) {
            return;
        }

        this.setupSignalrHub(this.authService.getAccessToken());
    }

    private setupSignalrHub(token: string): void {
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

        // TODO: the loadrequest below is a bit of a hack, should probably promote the hub to ngrx, but too lazy to do this right now
        // tslint:disable-next-line: ngrx-avoid-dispatching-multiple-actions-sequentially
        hub.start()
            .then(() => {
                this.hub = hub;
                this.store.dispatch(RemoteFileStoreActions.loadRequest());
            })
            .catch(err => console.error(err.toString()));
    }
}
