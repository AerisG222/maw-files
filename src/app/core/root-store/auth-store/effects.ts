import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';


@Injectable()
export class AuthStoreEffects {
    constructor(
        private actions$: Actions
    ) {

    }

    /*
    loadUserEffect$ = createEffect(() =>

        this.actions$.pipe(
            ofType(OidcActions.UserFound),
            switchMap(action =>
                of(AuthActions.updateUserPropertiesRequest({ userSettings: action.payload }))
            )
        )
        );
       */
}
