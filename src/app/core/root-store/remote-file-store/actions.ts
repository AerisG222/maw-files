import { createAction, props } from '@ngrx/store';
import { FileInfo } from '../../models/file-info';
import { FileOperationResult } from '../../models/file-operation-result';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';

export const loadRequest = createAction(
    '[Remote Files] Load Request'
);

export const loadFailure = createAction(
    '[Remote Files] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Remote Files] Load Success',
    props<{ files: FileInfo[] }>()
);

export const deleteRequest = createAction(
    '[Remote Files] Delete Request',
    props<{ files: string | string[] }>()
);

export const deleteFailure = createAction(
    '[Remote Files] Delete Failure',
    props<{ error: string }>()
);

export const deleteSuccess = createAction(
    '[Remote Files] Delete Success',
    props<{ result: FileOperationResult[] }>()
);

export const downloadRequest = createAction(
    '[Remote Files] Download Request',
    props<{ files: string | string[] }>()
);

export const downloadSuccess = createAction(
    '[Remote Files] Download Success'
);

export const downloadFailure = createAction(
    '[Remote Files] Download Failure',
    props<{ error: string }>()
);

export const fileAdded = createAction(
    '[SignalR] File Added',
    props<{ file: FileInfo }>()
);

export const fileDeleted = createAction(
    '[SignalR] File Deleted',
    props<{ file: FileInfo }>()
);

export const initializeUploaderRequest = createAction(
    '[Upload Component] Initialize Uploader Request'
);

export const initializeUploaderSuccess = createAction(
    '[Upload Component] Initialize Uploader Success',
    props<{ uploader: FileUploader }>()
);

export const initializeUploaderFailure = createAction(
    '[Upload Component] Initialize Uploader Failure',
    props<{ error: string }>()
);

export const uploadRequest = createAction(
    '[Upload] Upload Files',
    props<{ files: string[] }>()
);

export const uploadFailure = createAction(
    '[API] Upload Files Failed',
    props<{ error: string }>()
);

export const uploadSuccess = createAction(
    '[API] Upload Files Success',
    props<{ results: FileOperationResult[] }>()
);
