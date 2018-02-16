import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';

@Injectable()
export class AccountLoginInformation implements CanActivate{
    private access_token: string;
    private userName: string;
    public isUserLoggedIn: boolean = false;

    constructor(
        private router: Router
    ) {
        this.access_token = localStorage.getItem('access_token');
        this.userName = localStorage.getItem('userName');
        if(this.access_token != null)
        {
           this.isUserLoggedIn; 
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        if(this.access_token != null)
        {
          return new Observable<boolean>( observer => { observer.next(true)});
        }
        this.router.navigate(['/Benutzerverwaltung/Einloggen', {returnUrl: this.router.url}]);
      }

    public getAccessToken() : string
    {
        return this.access_token;
    }

    public setAccountInformation(accountData: AccountLoginInformation)
    {
        this.access_token = accountData.access_token;
        this.userName = accountData.userName;
        localStorage.setItem('access_token', accountData.access_token);
        localStorage.setItem('userName', accountData.userName);
        if(this.access_token != null)
        {
           this.isUserLoggedIn; 
        }
    }

    public LogOut() : void
    {
        this.access_token = null;
        this.userName = null;
        this.isUserLoggedIn = false;
        localStorage.removeItem('access_token');
        localStorage.removeItem('userName');
    }
}