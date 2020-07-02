import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { UploadService } from '../../core/services/upload.service';
import { first, tap, filter } from 'rxjs/operators';

@Component({
    selector: 'app-file-thumbnail',
    templateUrl: './file-thumbnail.component.html',
    styleUrls: ['./file-thumbnail.component.scss']
})
export class FileThumbnailComponent {
    url: SafeUrl | null = null;

    @Input()
    set relativeFilePath(value: string) {
        this.uploadService
            .loadThumbnail(value)
            .pipe(
                first(),
                filter(x => !!x),
                tap(blob => this.url = this.domSanitizer.bypassSecurityTrustUrl(blob))
            )
            .subscribe();
    }

    constructor(
        private uploadService: UploadService,
        private domSanitizer: DomSanitizer
    ) {

    }
}
