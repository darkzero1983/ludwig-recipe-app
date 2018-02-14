import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { UserData } from '../models';
import { AccountLogin } from '../models/account.login.model';
import { AccountLoginInformation } from './account.login.information';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService implements CanActivate {
  constructor(
    private http: HttpClient,
    private accountInformation: AccountLoginInformation
  ) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    if(this.accountInformation.getAccessToken() != null)
    {
      return new Observable<boolean>( observer => { observer.next(true)});
    }
    return this.getAccountDataObservable().map(data => {
      this.accountInformation = data;
      return true;
    });
  }

  public LoginUser(userData: AccountLogin) : Observable<boolean>
  {
    let body = "grant_type=password&username=" + userData.username + "&password=" + userData.password
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
      })
    };

    return this.http.post<AccountLoginInformation>(environment.apiAccountLogin ,body, httpOptions)
      .map(
        data => {
          
          this.accountInformation.setAccountInformation(data);
          
          return true;
        }
      );
  }
  private getAccountDataObservable(): Observable<AccountLoginInformation>
  {
    return this.http.get<AccountLoginInformation>(environment.useTestData ? environment.apiAccountDataTest : environment.apiAccountData);
  }

}