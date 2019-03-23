import { Actions, ActionTypes } from './actions';
import { remoteFileAdapter, initialState, State } from './state';
import { Action } from 'rxjs/internal/scheduler/Action';

export function remoteFileReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_SUCCESS: {
            return remoteFileAdapter.addMany(action.payload.files, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.LOAD_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }

        case ActionTypes.DELETE_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.DELETE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null
            };
        }
        case ActionTypes.DELETE_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }

        case ActionTypes.DOWNLOAD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.DOWNLOAD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null
            };
        }
        case ActionTypes.DOWNLOAD_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }

        case ActionTypes.FILE_ADDED: {
            return remoteFileAdapter.addOne(action.payload.file, {
                ...state,
            });
        }
        case ActionTypes.FILE_DELETED: {
            return remoteFileAdapter.removeOne(action.payload.file.location.relativePath, {
                ...state,
            });
        }

        case ActionTypes.INITIALIZE_UPLOADER_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.INITIALIZE_UPLOADER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                uploader: action.payload.uploader
            };
        }
        case ActionTypes.INITIALIZE_UPLOADER_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }

        case ActionTypes.UPLOAD_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.UPLOAD_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.UPLOAD_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }

        default: {
            return state;
        }
    }
}
