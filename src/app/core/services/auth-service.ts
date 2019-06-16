import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

import { AuthConfig } from '../models/auth-config';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private mgr: UserManager;
    private user: User;

    user$ = new BehaviorSubject(null);

    constructor(cfg: AuthConfig) {
        const settings = {
            authority: cfg.authority,
            client_id: cfg.clientId,
            post_logout_redirect_uri: cfg.postLogoutRedirectUri,
            redirect_uri: cfg.redirectUri,
            silent_redirect_uri: cfg.silentRedirectUri,
            load_user_info: cfg.loadUserInfo,
            automatic_silent_renew: cfg.automaticSilentRenew,
            filter_protocol_claims: cfg.filterProtocolClaims,
            response_type: cfg.responseType,
            scope: cfg.scope
        } as UserManagerSettings;

        this.mgr = new UserManager(settings);

        this.mgr.events.addUserLoaded(user => {
            this.updateUser(user);
        });

        this.mgr.getUser().then(user => {
            this.updateUser(user);
        });
    }

    isLoggedIn(): boolean {
        return this.user != null && !this.user.expired;
    }

    isAdmin(): boolean {
        return this.getClaims().role.includes('admin');
    }

    getClaims(): any {
        return this.user.profile;
    }

    getAuthorizationToken(): string {
        return this.user.access_token;
    }

    getAuthorizationHeaderValue(): string {
        return `${this.user.token_type} ${this.user.access_token}`;
    }

    startAuthentication(): Promise<void> {
        return this.mgr.signinRedirect();
    }

    completeAuthentication(): Promise<void> {
        return this.mgr.signinRedirectCallback().then(user => {
            this.updateUser(user);
        });
    }

    startSilentRenew(): Promise<void> {
        return this.mgr.signinSilent().then(user => {
            this.updateUser(user);
        });
    }

    completeSilentRenew(): void {
        this.mgr.signinSilentCallback().catch(error => {
            console.error(error);
        });
    }

    private updateUser(user: User) {
        this.user = user;

        this.user$.next(user);
    }
}
