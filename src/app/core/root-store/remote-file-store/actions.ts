import { Action } from '@ngrx/store';
import { FileInfo } from '../../models/file-info';
import { FileOperationResult } from '../../models/file-operation-result';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';

export enum ActionTypes {
    LOAD_REQUEST = '[Remote Files] Load Request',
    LOAD_FAILURE = '[Remote Files] Load Failure',
    LOAD_SUCCESS = '[Remote Files] Load Success',

    DELETE_REQUEST = '[Remote Files] Delete Request',
    DELETE_FAILURE = '[Remote Files] Delete Failure',
    DELETE_SUCCESS = '[Remote Files] Delete Succes',

    DOWNLOAD_REQUEST = '[Remote Files] Download Request',
    DOWNLOAD_FAILURE = '[Remote Files] Download Failure',
    DOWNLOAD_SUCCESS = '[Remote Files] Download Succes',

    UPLOAD_REQUEST = '[Upload] Upload Files',
    UPLOAD_FAILURE = '[API] Upload Files Failed',
    UPLOAD_SUCCESS = '[API] Upload Files Success',

    FILE_ADDED = '[SignalR] File Added',
    FILE_DELETED = '[SignalR] File Deleted',

    INITIALIZE_UPLOADER_REQUEST = '[Upload Component] Initialize Uploader Request',
    INITIALIZE_UPLOADER_SUCCESS = '[Upload Component] Initialize Uploader Success',
    INITIALIZE_UPLOADER_FAILURE = '[Upload Component] Initialize Uploader Failure'
}

export class LoadRequestAction implements Action {
    readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
    readonly type = ActionTypes.LOAD_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: { files: FileInfo[] }) { }
}

export class DeleteRequestAction implements Action {
    readonly type = ActionTypes.DELETE_REQUEST;
    constructor(public payload: { files: string | string[] }) { }
}

export class DeleteFailureAction implements Action {
    readonly type = ActionTypes.DELETE_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: { result: FileOperationResult[] }) { }
}

export class DownloadRequestAction implements Action {
    readonly type = ActionTypes.DOWNLOAD_REQUEST;
    constructor(public payload: { files: string | string[] }) { }
}

export class DownloadSuccessAction implements Action {
    readonly type = ActionTypes.DOWNLOAD_SUCCESS;
}

export class DownloadFailureAction implements Action {
    readonly type = ActionTypes.DOWNLOAD_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class FileAddedAction implements Action {
    readonly type = ActionTypes.FILE_ADDED;
    constructor(public payload: { file: FileInfo }) { }
}

export class FileDeletedAction implements Action {
    readonly type = ActionTypes.FILE_DELETED;
    constructor(public payload: { file: FileInfo }) { }
}

export class InitializeUploaderRequestAction implements Action {
    readonly type = ActionTypes.INITIALIZE_UPLOADER_REQUEST;
}

export class InitializeUploaderSuccessAction implements Action {
    readonly type = ActionTypes.INITIALIZE_UPLOADER_SUCCESS;
    constructor(public payload: { uploader: FileUploader }) { }
}

export class InitializeUploaderFailureAction implements Action {
    readonly type = ActionTypes.INITIALIZE_UPLOADER_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class UploadRequestAction implements Action {
    readonly type = ActionTypes.UPLOAD_REQUEST;
    constructor(public payload: { files: string[] }) { }
}

export class UploadFailureAction implements Action {
    readonly type = ActionTypes.UPLOAD_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class UploadSuccessAction implements Action {
    readonly type = ActionTypes.UPLOAD_SUCCESS;
    constructor(public payload: { results: FileOperationResult[] }) { }
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    DeleteRequestAction |
    DeleteFailureAction |
    DeleteSuccessAction |

    DownloadRequestAction |
    DownloadSuccessAction |
    DownloadFailureAction |

    FileAddedAction |
    FileDeletedAction |

    InitializeUploaderRequestAction |
    InitializeUploaderSuccessAction |
    InitializeUploaderFailureAction |

    UploadRequestAction |
    UploadFailureAction |
    UploadSuccessAction;
