import { createReducer, on } from '@ngrx/store';

import { initialState, State } from './state';
import * as SettingsActions from './actions';

export const reducer = createReducer(
    initialState,
    on(SettingsActions.loadRequest, (state): State => ({
        ...state,
        error: null,
        isLoading: true
    })),
    on(SettingsActions.loadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(SettingsActions.loadSuccess, (state, { settings }): State => ({
        ...state,
        settings: { ...settings },
        error: null,
        isLoading: false
    })),
    on(SettingsActions.saveRequest, (state): State => ({
        ...state,
        error: null
    })),
    on(SettingsActions.saveFailure, (state, { error }): State => ({
        ...state,
        error
    })),
    on(SettingsActions.saveSuccess, (state, { settings }): State => ({
        ...state,
        settings: { ...settings },
        error: null
    }))
);
