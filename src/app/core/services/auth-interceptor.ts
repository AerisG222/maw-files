import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { OidcFacade } from 'ng-oidc-client';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// https://medium.com/interoperable/using-httpinterceptor-to-add-a-bearer-token-to-api-calls-with-ng-oidc-client-6b088d680e73

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static OidcInterceptorService: any;
    constructor(private oidcFacade: OidcFacade) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.oidcFacade.identity$.pipe(
            switchMap(user => {
                if (user && user.access_token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${user.access_token}`
                        }
                    });
                }
                return next.handle(req);
            })
        );
    }
}
