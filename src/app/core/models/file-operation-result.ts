import { FileInfo } from './file-info';

export interface FileOperationResult {
    operation: string;
    relativePathSpecified: string;
    uploadedFile: FileInfo;
    wasSuccessful: boolean;
    error: string;
}
