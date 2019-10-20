import { createReducer, on, Action } from '@ngrx/store';

import * as RemoteFileActions from './actions';
import { remoteFileAdapter, initialState, State } from './state';

const reducer = createReducer(
    initialState,
    on(RemoteFileActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(RemoteFileActions.loadSuccess, (state, { files }) =>
        remoteFileAdapter.addMany(files, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(RemoteFileActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.deleteRequest, (state, { files }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(RemoteFileActions.deleteSuccess, (state, { result }) => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(RemoteFileActions.deleteFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.downloadRequest, (state, { files }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(RemoteFileActions.downloadSuccess, state => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(RemoteFileActions.downloadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.fileAdded, (state, { file }) =>
        remoteFileAdapter.addOne(file, {
            ...state,
        })
    ),
    on(RemoteFileActions.fileDeleted, (state, { file }) =>
        remoteFileAdapter.removeOne(file.location.relativePath, {
            ...state,
        })
    ),
    on(RemoteFileActions.initializeUploaderRequest, state => ({
        ...state,
        isLoading: true
    })),
    on(RemoteFileActions.initializeUploaderSuccess, (state, { uploader }) => ({
        ...state,
        isLoading: false,
        uploader
    })),
    on(RemoteFileActions.initializeUploaderFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(RemoteFileActions.uploadRequest, state => ({
        ...state,
        isLoading: true
    })),
    on(RemoteFileActions.uploadSuccess, state => ({
        ...state,
        isLoading: false
    })),
    on(RemoteFileActions.uploadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);

export function remoteFileReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
