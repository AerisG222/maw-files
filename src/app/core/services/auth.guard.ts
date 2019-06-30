import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OidcFacade } from 'ng-oidc-client';
import { Observable, of } from 'rxjs';
import { switchMap, first, take } from 'rxjs/operators';

// https://medium.com/interoperable/route-guards-to-guard-routes-with-ng-oidc-client-6a61e6029424

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private oidcFacade: OidcFacade) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.oidcFacade.identity$.pipe(
            take(1),
            switchMap(user => {
                console.log('Auth Guard - Checking if user exists', user);
                console.log('Auth Guard - Checking if user is expired:', user && user.expired);
                if (user && !user.expired) {
                    return of(true);
                } else {
                    this.router.navigate(['/access-denied']);
                    return of(false);
                }
            })
        );
    }
}
