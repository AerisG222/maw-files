import { FileLocation } from './file-location';

export interface FileInfo {
    location: FileLocation;
    creationTime: Date;
    sizeInBytes: number;
}
