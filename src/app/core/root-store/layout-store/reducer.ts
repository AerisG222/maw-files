import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function layoutReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.INITIALIZE_REQUEST:
            return state;
        case ActionTypes.INITIALIZE_COMPLETED:
            return {
                ...state,
                isMobileView: action.payload.isMobileView
            };
        case ActionTypes.MEDIA_QUERY_UPDATED:
            return {
                ...state,
                isMobileView: action.payload.isMobileView
            };

        default: {
            return state;
        }
    }
}
