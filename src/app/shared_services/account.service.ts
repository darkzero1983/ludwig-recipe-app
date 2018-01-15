import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../shared_models/user.data.model';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map"; 
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AccountService implements CanActivate {
  public isUserLoggedIn: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.getAccountDataObservable().subscribe(data => {
      this.isUserLoggedIn = data.isUserLoggedIn;
    }); 
  }

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean>|Promise<boolean>|boolean {
    console.info(route);
    return this.http.get<boolean>('/test_data/canActivate.json');
  }

  private getAccountDataObservable(): Observable<UserData>
  {
    return this.http.get<UserData>('/test_data/account-data.json');
  }

}