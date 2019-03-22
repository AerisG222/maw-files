import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UploadState } from '../../core/state/upload.state';

@Component({
    selector: 'app-download-handler',
    templateUrl: './download-handler.component.html',
    styleUrls: ['./download-handler.component.scss']
})
export class DownloadHandlerComponent {
    @Select(UploadState.getDownloadError) error$: Observable<any>;

    constructor() { }
}
