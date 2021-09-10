import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { authConfig } from '../auth-config';
import { UserInfo } from '../models/user-info.model';
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

    private async finishLogin(): Promise<void> {
        if (this.router.routerState.snapshot.url.startsWith('/login')) {
            const profile = await this.oauthService.loadUserProfile();

            if(profile) {
                const userInfo = this.buildUserInfo(profile);
                this.storeProfile(userInfo);
            }

            this.router.navigate(['/']);
        }
    }

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private buildUserInfo(profile: any): UserInfo {
        if('given_name' in profile &&
            'family_name' in profile &&
            'role' in profile) {
            return {
                username: profile.name as string,
                firstName: profile.given_name as string,
                lastName: profile.family_name as string,
                roles: profile.role as string[]
            };
        }

        // not sure why this is sometimes embedded under info...
        if('info' in profile &&
            'given_name' in profile.info &&
            'family_name' in profile.info &&
            'role' in profile.info) {
            return {
                username: profile.info.name as string,
                firstName: profile.info.given_name as string,
                lastName: profile.info.family_name as string,
                roles: profile.info.role as string[]
            };
        }

        throw Error('Invalid profile!');
    }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */

    private storeProfile(userInfo: UserInfo): void {
        this.store.dispatch(updateUserInfoRequest({ userInfo }));
    }
}
