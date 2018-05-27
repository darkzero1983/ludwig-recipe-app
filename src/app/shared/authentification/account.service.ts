import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { UserData } from '../models';
import { AccountLogin } from '../models/account.login.model';
import { AccountLoginInformation } from './account.login.information';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class AccountService {
  constructor(
    private http: HttpClient,
    private accountInformation: AccountLoginInformation
  ) {}

  public LoginUser(userData: AccountLogin) : Observable<boolean>
  {
    let body = "grant_type=password&username=" + userData.username + "&password=" + userData.password
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
      })
    };

    return this.http.post<AccountLoginInformation>(environment.apiAccountLogin ,body, httpOptions)
      .pipe(map(
        data => {
          this.accountInformation.setAccountInformation(data);
          return true;
        }
      ));
      
  }
}