import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'account-login-component',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.login.component.less']
})
export class AccountLoginComponent {
  private hide:boolean = true;
  //private userName: string = "Peter";
  private loginForm = new FormGroup ({
    userName: new FormControl(),
    password: new FormControl()
  });

  public constructor(
    private titleService: Title 
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");

   }

   login()
   {
     console.info(this.loginForm);
   }
}
