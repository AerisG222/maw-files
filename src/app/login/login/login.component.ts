import { Component } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { filter, tap, first } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    showLogin = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
        // hide view when trying to process login callback
        this.activatedRoute.queryParamMap
            .pipe(
                first(),
                filter(p => p.has('code')),
                tap(p => this.showLogin = false),
                tap(p => this.authService.handleLoginCallback())
            )
            .subscribe();

        // otherwise show login screen and try to use popup
        this.activatedRoute.queryParamMap
            .pipe(
                first(),
                filter(p => !p.has('code')),
                tap(p => this.showLogin = true),
                tap(p => this.authService.loginViaPopup())
            )
            .subscribe();
    }

    redirectLogin(): void {
        this.authService.redirectAndLogin();
    }
}
