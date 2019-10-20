import { createReducer, on, Action } from '@ngrx/store';

import { initialState, State } from './state';
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

export function settingsReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
