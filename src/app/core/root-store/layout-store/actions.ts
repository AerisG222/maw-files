import { Action } from '@ngrx/store';

export enum ActionTypes {
    INITIALIZE_REQUEST = '[Layout] Initialize Request',
    INITIALIZE_COMPLETED = '[Layout] Initialize Completed',
    MEDIA_QUERY_UPDATED = '[Layout] Media Query Updated'
}

export class InitializeRequestAction implements Action {
    readonly type = ActionTypes.INITIALIZE_REQUEST;
}

export class InitializeCompletedAction implements Action {
    readonly type = ActionTypes.INITIALIZE_COMPLETED;
    constructor(public payload: { isMobileView: boolean }) { }
}

export class MediaQueryUpdatedAction implements Action {
    readonly type = ActionTypes.MEDIA_QUERY_UPDATED;
    constructor(public payload: { isMobileView: boolean }) { }
}

export type Actions =
    InitializeRequestAction |
    InitializeCompletedAction |

    MediaQueryUpdatedAction;
