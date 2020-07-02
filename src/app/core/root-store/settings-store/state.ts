import { Settings } from '../../models/settings.model';
import { Theme } from '../../models/theme.model';

export interface State {
    error: string | null;
    isLoading: boolean;
    settings: Settings;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    settings: {
        appTheme: Theme.themeDark,
    }
};
