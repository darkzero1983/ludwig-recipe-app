import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AccountLoginInformation } from '../../../../shared/authentification/account.login.information';

@Component({
  selector: 'account-logout-component',
  template: ''
})
export class AccountLogoutComponent {
  public constructor(
    private router: Router,
    private account: AccountLoginInformation
  ) {
    account.LogOut();
    this.router.navigate(['/']);
  }
}