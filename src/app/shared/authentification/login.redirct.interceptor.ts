import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AccountLoginInformation } from './account.login.information';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginRedirectInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private accountLoginInformation: AccountLoginInformation
    )
    {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401 && !this.router.url.startsWith('/Benutzerverwaltung/Einloggen')) {
                    this.accountLoginInformation.LogOut();
                    this.router.navigate(['/Benutzerverwaltung/Einloggen', {returnUrl: this.router.url}]);
                }
            }
        }));
    }
}