import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateUser, ShowUsername } from '../state/auth.actions';
import { User } from 'oidc-client';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root'
})
export class AuthStoreManagerService {
    constructor(private _store: Store,
                private _authService: AuthService) {
        this._authService.user$.subscribe(user => {
            this.updateUser(user);
        });
    }

    private updateUser(user: User) {
        if (user) {
            this._store.dispatch(new ShowUsername(user.profile.role.includes('admin')));
        }

        this._store.dispatch(new UpdateUser(user));
    }
}