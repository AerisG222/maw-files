import { Settings } from '../../models/settings.model';
import { Theme } from '../../models/theme.model';

export interface State {
    error?: string;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: undefined,
    isLoading: false,
    settings: {
        appTheme: Theme.themeDark,
    }
};
