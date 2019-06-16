import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        return new Promise((resolve) => {
            this.authService.startSilentRenew()
                .then(() => {
                    if (this.authService.isLoggedIn()) {
                        resolve(true);
                    } else {
                        this.authService.startAuthentication();
                        resolve(false);
                    }
                })
                .catch(() => {
                    this.authService.startAuthentication();
                    resolve(false);
                });
        });
    }
}
