import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { startWith, map } from 'rxjs/operators';

import * as SettingsActions from './actions';
import { SettingsService } from '../../services/settings.service';

@Injectable()
export class SettingsStoreEffects {
    constructor(
        private settingsService: SettingsService,
        private actions$: Actions
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SettingsActions.loadRequest),
            startWith(SettingsActions.loadRequest()),
            map(x => {
                const settings = this.settingsService.load();
                return SettingsActions.loadSuccess({ settings });
            })
        )
    );

    saveRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SettingsActions.saveRequest),
            map(action => {
                try {
                    this.settingsService.save(action.settings);
                    return SettingsActions.saveSuccess(action);
                } catch (err) {
                    return SettingsActions.saveFailure(err);
                }
            })
        )
    );
}
