import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'account-login-component',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.login.component.less']
})
export class AccountLoginComponent {
  public constructor(
    private titleService: Title 
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");
   }
}
