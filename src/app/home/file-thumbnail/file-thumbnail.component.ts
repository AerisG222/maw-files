import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../../core/services/upload.service';

@Component({
    selector: 'app-file-thumbnail',
    templateUrl: './file-thumbnail.component.html',
    styleUrls: ['./file-thumbnail.component.scss']
})
export class FileThumbnailComponent {
    show$ = new BehaviorSubject<boolean>(false);
    url$ = new BehaviorSubject<any>(null);

    @Input()
    set relativeFilePath(value: string) {
        this._uploadService
            .loadThumbnail(value)
            .subscribe(
                blob => {
                    this.url$.next(this._domSanitizer.bypassSecurityTrustUrl(blob));
                    this.show$.next(true);
                },
                ex => this.show$.next(false)
            );
    }

    constructor(private _uploadService: UploadService,
                private _domSanitizer: DomSanitizer) {

    }
}