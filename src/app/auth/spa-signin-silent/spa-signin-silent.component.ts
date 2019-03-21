import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'app-spa-signin-silent',
    templateUrl: './spa-signin-silent.component.html',
    styleUrls: ['./spa-signin-silent.component.scss']
})
export class SpaSigninSilentComponent implements OnInit {
    constructor(
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this._authService.completeSilentRenew();
    }
}
