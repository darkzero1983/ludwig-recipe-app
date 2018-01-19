import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../models';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccountService implements CanActivate {
  public isUserLoggedIn: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.getAccountDataObservable().subscribe(data => {
      //this.isUserLoggedIn = data.isUserLoggedIn;
    }); 
  }

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> {
    return this.http.get<boolean>(environment.useTestData ? environment.apiAccountCanActiveTest : environment.apiAccountCanActive);
  }

  private getAccountDataObservable(): Observable<UserData>
  {
    return this.http.get<UserData>(environment.useTestData ? environment.apiAccountDataTest : environment.apiAccountData);
  }

}