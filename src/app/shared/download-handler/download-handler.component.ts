import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RemoteFileStoreSelectors } from '../../core/root-store';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-download-handler',
    templateUrl: './download-handler.component.html',
    styleUrls: ['./download-handler.component.scss']
})
export class DownloadHandlerComponent {
    error$: Observable<string>;

    constructor(
        private store: Store
    ) {
        this.error$ = this.store
            .select(RemoteFileStoreSelectors.selectRemoteFileError)
            .pipe(
                filter(x => !!x),
                map(x => x as string)
            );
    }
}
