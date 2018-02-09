import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { TranslationService, AccountService } from '../../../../shared/services';
import { AccountLogin } from '../../../../shared/models/account.login.model';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'account-login-component',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.login.component.less']
})
export class AccountLoginComponent {
  public hide:boolean = true;
  private userName: string;
  public isGerman: boolean = true;
  public loginForm: FormGroup;
  public userNameMaxLength: number = 30;

  public constructor(
    public titleService: Title,
    public translation: TranslationService,
    public accountService: AccountService,
    public validation: ValidationService
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");

    this.loginForm = new FormGroup ({
      grant_type: new FormControl('password'),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(model: AccountLogin, isValid: boolean) {
    if(!isValid)
    {
      //return;
    }
    this.accountService.LoginUser(model);
    console.log(model);

  }

  languageTest(){
    if(this.isGerman)
    {
      this.translation.switchCulture("en-US");
    }
    else
    {
      this.translation.switchCulture("de-DE");
    }
    this.isGerman = !this.isGerman;
  }
}