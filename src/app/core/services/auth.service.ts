import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { authConfig } from '../auth-config';
import { updateUserInfoRequest } from '../root-store/auth-store/actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private store: Store,
        private router: Router,
        private oauthService: OAuthService
    ) {
        this.oauthService.configure(authConfig);

        this.oauthService.events
            .pipe(
                filter(e => e.type === 'token_received'),
                tap(p => this.finishLogin())
            )
            .subscribe();

        this.oauthService.setupAutomaticSilentRefresh({}, 'access_token');
    }

    public handleLoginCallback(): void {
        if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
            // if we already have valid tokens, let's use them
            this.oauthService.loadDiscoveryDocument()
                .then(_ => this.finishLogin());
        } else {
            // check to see if we are receiving the auth response, and if so, receive the tokens
            this.oauthService.loadDiscoveryDocumentAndTryLogin();
        }
    }

    public redirectAndLogin(): void {
        this.oauthService.initCodeFlow();
    }

    public getAccessToken(): string {
        return this.oauthService.getAccessToken();
    }

    public async loginViaPopup(): Promise<void> {
        await this.oauthService.loadDiscoveryDocument();

        this.oauthService.initLoginFlowInPopup({ height: 600, width: 600 });
    }

    private finishLogin(): void {
        if (this.router.routerState.snapshot.url.startsWith('/login')) {
            this.oauthService.loadUserProfile()
                .then(profile => {
                    this.storeProfile(profile);
                    this.router.navigate(['/']);
                });
        }
    }

    private storeProfile(profile: UserInfo): void {
        if (!!profile) {
            const userInfo = {
                username: profile.name as string,
                firstName: profile.given_name as string,
                lastName: profile.family_name as string,
                roles: profile.role as string[]
            };

            this.store.dispatch(updateUserInfoRequest({ userInfo }));
        }
    }
}
