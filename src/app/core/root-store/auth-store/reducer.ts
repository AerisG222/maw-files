import { on, createReducer } from '@ngrx/store';

import { initialState, State } from './state';
import { updateUserInfoRequest } from './actions';

export const reducer = createReducer(
    initialState,
    on(updateUserInfoRequest, (state, { userInfo }): State => ({
        ...state,
        auth: userInfo
    }))
);
