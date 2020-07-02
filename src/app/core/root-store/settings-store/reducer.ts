import { createReducer, on } from '@ngrx/store';

import { initialState } from './state';
import * as SettingsActions from './actions';

export const reducer = createReducer(
    initialState,
    on(SettingsActions.loadRequest, state => ({
        ...state,
        error: null,
        isLoading: true
    })),
    on(SettingsActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(SettingsActions.loadSuccess, (state, { settings }) => ({
        ...state,
        settings: { ...settings },
        error: null,
        isLoading: false
    })),
    on(SettingsActions.saveRequest, state => ({
        ...state,
        error: null
    })),
    on(SettingsActions.saveFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(SettingsActions.saveSuccess, (state, { settings }) => ({
        ...state,
        settings: { ...settings },
        error: null
    }))
);
