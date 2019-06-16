import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth-service';

@Component({
    selector: 'app-spa-signin-silent',
    templateUrl: './spa-signin-silent.component.html',
    styleUrls: ['./spa-signin-silent.component.scss']
})
export class SpaSigninSilentComponent implements OnInit {
    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.completeSilentRenew();
    }
}
