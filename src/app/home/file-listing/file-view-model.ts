import { FileInfo } from '../../core/models/file-info';
import { FileLocation } from '../../core/models/file-location';

export class FileViewModel implements FileInfo {
    constructor(public location: FileLocation,
                public creationTime: Date,
                public sizeInBytes: number,
                public isChecked = false) {

    }
}
