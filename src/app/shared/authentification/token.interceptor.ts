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
  
    if(this.auth.getAccessToken() != null)
    {
        console.info('Token:');
        console.info(this.auth.getAccessToken());

        request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' +this.auth.getAccessToken()
            }
          }); 
    }
    
    

   request = request.clone();

    return next.handle(request);
  }
}