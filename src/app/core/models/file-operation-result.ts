import { FileInfo } from './file-info';

export interface FileOperationResult {
    operation: string;
    relativePathSpecified: string;
    UploadedFile: FileInfo;
    wasSuccessful: boolean;
    error: string;
}
