import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { REMOTE_FILE_FEATURE_NAME } from './feature-name';
import { remoteFileAdapter, State } from './state';
import { FileUploader } from 'ng2-file-upload';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getUploader = (state: State): FileUploader  => state.uploader;

export const selectRemoteFileState = createFeatureSelector<State>(REMOTE_FILE_FEATURE_NAME);

export const selectAllRemoteFiles = remoteFileAdapter.getSelectors(selectRemoteFileState).selectAll;

export const selectRemoteFileError = createSelector(selectRemoteFileState, getError);
export const selectRemoteFileIsLoading = createSelector(selectRemoteFileState, getIsLoading);
export const selectRemoteFileUploader = createSelector(selectRemoteFileState, getUploader);
