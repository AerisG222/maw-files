import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

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
    private hub: HubConnection | null = null;

    constructor(private http: HttpClient,
                private store: Store,
                private authService: AuthService,
                private zone: NgZone) {

    }

    getServerFiles(): Observable<FileInfo[]> {
        return from(this.ensureHubConnected()).pipe(
            switchMap(x => {
                if (!!this.hub) {
                    return from(this.hub.invoke('GetAllFiles'));
                }

                return of([]);
            })
        );
    }

    deleteFiles(files: string[]): Observable<FileOperationResult[]> {
        return from(this.ensureHubConnected()).pipe(
            switchMap(x => {
                if (!!files && files.length > 0 && !!this.hub) {
                    return from(this.hub.invoke('DeleteFiles', files).catch(ex => console.error(ex)));
                }

                return of([]);
            })
        );
    }

    downloadFiles(files: string[]): Observable<HttpResponse<Blob>> {
        if (!!files && files.length > 0) {
            const url = this.getAbsoluteUrl('upload/download');

            return this.http
                .post(url, files, { responseType: 'blob', observe: 'response' });
        }

        throw new Error('no files to download');
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
    private async ensureHubConnected(): Promise<void> {
        if (!!this.hub) {
            return;
        }

        await this.setupSignalrHub(this.authService.getAccessToken());
    }

    private async setupSignalrHub(token: string): Promise<void> {
        console.log('setting up signalr hub...');

        const tokenValue = `?token=${token}`;
        const url = `${this.getAbsoluteUrl('uploadr')}${tokenValue}`;

        const hub = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Trace)
            // TODO: enable message pack once it supports camel casing
            // .withHubProtocol(new MessagePackHubProtocol())
            .build();

        hub.on('FileAdded', (addedFile: FileInfo) => {
            console.log('file added: ', addedFile);

            this.zone.run(() => this.store.dispatch(RemoteFileStoreActions.fileAdded({ file: addedFile })));
        });

        // eslint-disable-next-line
        hub.on('FileDeleted', (deletedFile: FileInfo) => {
            console.log('file deleted: ', deletedFile);

            this.zone.run(() => this.store.dispatch(RemoteFileStoreActions.fileDeleted({ file: deletedFile })));
        });

        // TODO: the loadrequest below is a bit of a hack, should probably promote the hub to ngrx, but too lazy to do this right now
        // eslint-disable-next-line
        try {
            await hub.start();
            this.hub = hub;
            this.store.dispatch(RemoteFileStoreActions.loadRequest());
        } catch (err) {
            return console.error(err.toString());
        }
    }
}
