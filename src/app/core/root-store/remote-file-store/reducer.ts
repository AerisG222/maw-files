import { createReducer, on } from '@ngrx/store';

import * as RemoteFileActions from './actions';
import { remoteFileAdapter, initialState, State } from './state';

export const reducer = createReducer(
    initialState,
    on(RemoteFileActions.loadRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(RemoteFileActions.loadSuccess, (state, { files }): State =>
        remoteFileAdapter.addMany(files, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(RemoteFileActions.loadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.deleteRequest, (state, { files }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(RemoteFileActions.deleteSuccess, (state, { result }): State => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(RemoteFileActions.deleteFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.downloadRequest, (state, { files }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(RemoteFileActions.downloadSuccess, (state): State => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(RemoteFileActions.downloadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.fileAdded, (state, { file }): State =>
        remoteFileAdapter.addOne(file, {
            ...state,
        })
    ),
    on(RemoteFileActions.fileDeleted, (state, { file }): State =>
        remoteFileAdapter.removeOne(file.location.relativePath, {
            ...state,
        })
    ),
    on(RemoteFileActions.initializeUploaderRequest, (state): State => ({
        ...state,
        isLoading: true
    })),
    on(RemoteFileActions.initializeUploaderSuccess, (state, { uploader }): State => ({
        ...state,
        isLoading: false,
        uploader
    })),
    on(RemoteFileActions.initializeUploaderFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.uploadRequest, (state): State => ({
        ...state,
        isLoading: true
    })),
    on(RemoteFileActions.uploadSuccess, (state): State => ({
        ...state,
        isLoading: false
    })),
    on(RemoteFileActions.uploadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    }))
);
