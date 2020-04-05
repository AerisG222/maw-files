import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RemoteFileStoreSelectors } from '../../core/root-store';

@Component({
    selector: 'app-download-handler',
    templateUrl: './download-handler.component.html',
    styleUrls: ['./download-handler.component.scss']
})
export class DownloadHandlerComponent {
    error$: Observable<any>;

    constructor(
        private store: Store
    ) {
        this.error$ = this.store.pipe(
            select(RemoteFileStoreSelectors.selectRemoteFileError)
        );
    }
}
