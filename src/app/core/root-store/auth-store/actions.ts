import { createAction, props } from '@ngrx/store';

import { UserInfo } from '../../models/user-info.model';

export const updateUserInfoRequest = createAction(
    '[Auth] Update User Info Request',
    props<{ userInfo: UserInfo }>()
);
