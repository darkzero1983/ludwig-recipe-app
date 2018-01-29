import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../models';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService implements CanActivate {
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

  private getAccountDataObservable(): Observable<UserData>
  {
    return this.http.get<UserData>(environment.useTestData ? environment.apiAccountDataTest : environment.apiAccountData);
  }

}