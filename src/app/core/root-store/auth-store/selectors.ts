import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { State } from './state';
import { AUTH_FEATURE_NAME } from './feature-name';

const getUserInfo = (state: State) => state.auth;

export const selectAuthState = createFeatureSelector<State>(AUTH_FEATURE_NAME);

export const selectUserInfo = createSelector(selectAuthState, getUserInfo);

export const selectFirstName = createSelector(
    selectUserInfo,
    u => u?.firstName
);

export const selectLastName = createSelector(
    selectUserInfo,
    u => u?.lastName
);

export const selectUsername = createSelector(
    selectUserInfo,
    u => u?.username
);

export const selectRoles = createSelector(
    selectUserInfo,
    u => u?.roles
);

export const selectIsAdmin = createSelector(
    selectRoles,
    roles => !!(roles.find(r => r === 'admin'))
);
