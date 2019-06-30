import { Component, AfterViewInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

    constructor(
        private oidcFacade: OidcFacade
    ) { }

    ngAfterViewInit(): void {
        this.oidcFacade.signinPopup();
    }
}
