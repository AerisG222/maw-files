import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
// import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
    selector: 'app-spa-signin',
    templateUrl: './spa-signin.component.html',
    styleUrls: ['./spa-signin.component.scss']
})
export class SpaSigninComponent implements OnInit {
    constructor(
        private router: Router,
        // private _settingsSvc: SettingsService,
        private authService: AuthService
    ) {

    }

    ngOnInit() {
        this.authService
            .completeAuthentication()
            .then(x => {
                // const destUrl = this._settingsSvc.getAuthRedirectUrl();

                // if (destUrl != null) {
                //     this._settingsSvc.clearAuthRedirectUrl();
                //     this._router.navigate([ destUrl ]);
                // } else {
                     this.router.navigate([ '/' ]);
                // }
            })
            .catch(x => console.log(`Error authenticating: ${x}`));
    }
}
