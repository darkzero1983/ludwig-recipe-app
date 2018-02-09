import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserData } from '../models';
import { AccountLogin } from '../models/account.login.model';
import { AccountLoginResult } from '../models/account.login.result.model';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService implements CanActivate {
  public accessToken: string;
  public isUserLoggedIn?: boolean = null;

  constructor(
    private http: HttpClient
  ) {
    
    if(this.isUserLoggedIn == null)
    {
      this.getAccountDataObservable().subscribe(data => {
        this.isUserLoggedIn = data.isUserLoggedIn;
      });
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    if(this.isUserLoggedIn != null)
    {
      return new Observable<boolean>( observer => { observer.next(this.isUserLoggedIn)});
    }
    return this.getAccountDataObservable().map(data => {
      this.isUserLoggedIn = data.isUserLoggedIn;
      return data.isUserLoggedIn;
    });
  }

  public LoginUser(userData: AccountLogin):Observable<boolean>
  {
    let body = "grant_type=password&username=" + userData.username + "&password=" + userData.password
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
      })
    };

    return this.http.post<AccountLoginResult>(environment.apiAccountLogin ,body, httpOptions)
      .map(
        data => {
          this.accessToken = data.access_token;
          return true;
        }
      );
  }
  private getAccountDataObservable(): Observable<UserData>
  {
    return this.http.get<UserData>(environment.useTestData ? environment.apiAccountDataTest : environment.apiAccountData);
  }

}