import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { RemoteFileStoreSelectors } from './remote-file-store';

export const selectError = createSelector(
    SettingsStoreSelectors.selectSettingsError,
    RemoteFileStoreSelectors.selectRemoteFileError,
    (settingsError: string | undefined, remoteFileError: string | undefined) => {
        return settingsError || remoteFileError;
    }
);

export const selectIsLoading = createSelector(
    SettingsStoreSelectors.selectSettingsIsLoading,
    RemoteFileStoreSelectors.selectRemoteFileIsLoading,
    (settingsIsLoading: boolean, remoteFileIsLoading: boolean) => {
        return settingsIsLoading || remoteFileIsLoading;
    }
);

