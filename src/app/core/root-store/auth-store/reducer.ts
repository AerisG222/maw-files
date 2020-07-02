import { on, createReducer } from '@ngrx/store';

import { initialState } from './state';
import { updateUserInfoRequest } from './actions';

export const reducer = createReducer(
    initialState,
    on(updateUserInfoRequest, (state, { userInfo }) => ({
        ...state,
        auth: userInfo
    }))
);
