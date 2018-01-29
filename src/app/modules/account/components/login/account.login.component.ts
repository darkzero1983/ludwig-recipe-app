import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { TranslationService } from '../../../../shared/services';

@Component({
  selector: 'account-login-component',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.login.component.less']
})
export class AccountLoginComponent {
  private hide:boolean = true;
  private isGerman: boolean = true;

  private loginForm = new FormGroup ({
    userName: new FormControl('', Validators.required && Validators.maxLength(10)),
    password: new FormControl()
  });

  public constructor(
    private titleService: Title,
    private translationService: TranslationService 
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");
  }

   login()
   {
     if(this.isGerman)
     {
      this.translationService.switchCulture("en-US");
     }
     else
     {
      this.translationService.switchCulture("de-DE");
     }
     this.isGerman = !this.isGerman;
   }
}
