import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RootStoreState, RemoteFileStoreSelectors } from '../../core/root-store';

@Component({
    selector: 'app-download-handler',
    templateUrl: './download-handler.component.html',
    styleUrls: ['./download-handler.component.scss']
})
export class DownloadHandlerComponent {
    error$: Observable<any>;

    constructor(
        private _store: Store<RootStoreState.State>
    ) {
        this.error$ = this._store.pipe(
            select(RemoteFileStoreSelectors.selectRemoteFileError)
        );
    }
}
