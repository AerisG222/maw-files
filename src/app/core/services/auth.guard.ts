import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private oauthService: OAuthService
    ) {

    }

    public canActivate() {
        if (this.oauthService.hasValidAccessToken()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
