import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import * as layoutActions from './actions';
import { State } from './state';

@Injectable()
export class LayoutStoreEffects {
    constructor(
        private mediaObserver: MediaObserver,
        private actions$: Actions,
        private store$: Store<State>
    ) {
        this.mediaObserver.asObservable()
            .pipe(
                filter(change => !!change && change.length > 0),
                tap(change => this.store$.dispatch(new layoutActions.MediaQueryUpdatedAction({ isMobileView: this.getIsMobileView() })))
            ).subscribe();
    }

    @Effect()
    initializeRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<layoutActions.InitializeRequestAction>(layoutActions.ActionTypes.INITIALIZE_REQUEST),
        map(action => {
            return new layoutActions.InitializeCompletedAction({ isMobileView: this.getIsMobileView() });
        })
    );

    private getIsMobileView(): boolean {
        return this.mediaObserver.isActive('lt-md');
    }
}
