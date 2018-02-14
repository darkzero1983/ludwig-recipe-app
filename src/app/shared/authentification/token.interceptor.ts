import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AccountLoginInformation } from './account.login.information';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AccountLoginInformation) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.access_token}`
      }
    });
    */

   request = request.clone();

    return next.handle(request);
  }
}