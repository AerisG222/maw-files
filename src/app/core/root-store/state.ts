import { LayoutStoreState } from './layout-store';
import { RemoteFileStoreState } from './remote-file-store';
import { SettingsStoreState } from './settings-store';

export interface State {
    layout: LayoutStoreState.State;
    remoteFile: RemoteFileStoreState.State;
    settings: SettingsStoreState.State;
}
