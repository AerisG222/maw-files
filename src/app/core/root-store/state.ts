import { RemoteFileStoreState } from './remote-file-store';
import { SettingsStoreState } from './settings-store';

export interface State {
    remoteFile: RemoteFileStoreState.State;
    settings: SettingsStoreState.State;
}
