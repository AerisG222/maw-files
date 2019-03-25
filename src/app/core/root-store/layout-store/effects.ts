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
        private _mediaObserver: MediaObserver,
        private _actions$: Actions,
        private _store$: Store<State>
    ) {
        this._mediaObserver.asObservable()
            .pipe(
                filter(change => !!change && change.length > 0),
                tap(change => this._store$.dispatch(new layoutActions.MediaQueryUpdatedAction({ isMobileView: this.getIsMobileView() })))
            ).subscribe();
    }

    @Effect()
    initializeRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<layoutActions.InitializeRequestAction>(layoutActions.ActionTypes.INITIALIZE_REQUEST),
        map(action => {
            return new layoutActions.InitializeCompletedAction({ isMobileView: this.getIsMobileView() });
        })
    );

    private getIsMobileView(): boolean {
        return this._mediaObserver.isActive('lt-md');
    }
}
