import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';
import { Theme } from '../../models/theme.model';
import { Settings } from '../../models/settings.model';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;

const getAppTheme = (state: State): Theme => state.settings.appTheme;

export const selectSettingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const selectSettingsError = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading = createSelector(selectSettingsState, getIsLoading);
export const selectSettings = createSelector(selectSettingsState, getSettings);

export const selectAppTheme = createSelector(selectSettingsState, getAppTheme);
