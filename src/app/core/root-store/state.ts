import { RemoteFileStoreState } from './remote-file-store';
import { SettingsStoreState } from './settings-store';

export interface State {
    settings: SettingsStoreState.State;
    remoteFile: RemoteFileStoreState.State;
}
