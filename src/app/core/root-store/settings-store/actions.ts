import { createAction, props } from '@ngrx/store';

import { Settings } from '../../models/settings.model';

export const loadRequest = createAction(
    '[Settings] Load Request'
);

export const loadFailure = createAction(
    '[Settings] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Settings] Load Success',
    props<{ settings: Settings }>()
);

export const saveRequest = createAction(
    '[Settings] Save Request',
    props<{ settings: Settings }>()
);

export const saveSuccess = createAction(
    '[Settings] Save Success',
    props<{ settings: Settings }>()
);

export const saveFailure = createAction(
    '[Settings] Save Failure',
    props<{error: string }>()
);
