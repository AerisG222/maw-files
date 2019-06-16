import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import * as settingsActions from './actions';
import { SettingsService } from '../../services/settings.service';

@Injectable()
export class SettingsStoreEffects {
    constructor(
        private settingsService: SettingsService,
        private actions$: Actions
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<settingsActions.LoadRequestAction>(settingsActions.ActionTypes.LOAD_REQUEST),
        startWith(new settingsActions.LoadRequestAction()),
        map(x => {
            const settings = this.settingsService.load();
            return new settingsActions.LoadSuccessAction({ settings });
        })
    );

    @Effect()
    saveRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<settingsActions.SaveRequestAction>(settingsActions.ActionTypes.SAVE_REQUEST),
        map(action => {
            try {
                this.settingsService.save(action.payload.settings);
                return new settingsActions.SaveSuccessAction(action.payload);
            } catch (err) {
                return new settingsActions.SaveFailureAction(err);
            }
        })
    );
}
