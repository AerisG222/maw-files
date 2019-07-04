import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcFacade } from 'ng-oidc-client';
import { filter, tap, take } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
    constructor(
        private oidcFacade: OidcFacade,
        private router: Router
    ) {

    }

    ngAfterViewInit(): void {
        this.oidcFacade.identity$.pipe(
            tap(user => {
                if (!!user && !user.expired) {
                    this.onLoggedIn();
                } else {
                    this.popupLogin();
                }
            })
        ).subscribe();
    }

    popupLogin(): void {
        this.oidcFacade.signinPopup();
    }

    redirectLogin(): void {
        this.oidcFacade.signinRedirect();
    }

    onLoggedIn(): void {
        this.router.navigate(['/']);
    }
}
