import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { LAYOUT_FEATURE_NAME } from './feature-name';
import { State } from './state';

const getIsMobileView = (state: State): boolean => state.isMobileView;

export const selectLayoutState = createFeatureSelector<State>(LAYOUT_FEATURE_NAME);

export const selectLayoutIsMobileView = createSelector(selectLayoutState, getIsMobileView);
