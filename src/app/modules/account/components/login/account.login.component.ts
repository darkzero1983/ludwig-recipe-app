import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { TranslationService } from '../../../../shared/services';
import { AccountLogin } from '../../models/account.login.model';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'account-login-component',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.login.component.less']
})
export class AccountLoginComponent {
  public hide:boolean = true;
  public isGerman: boolean = true;
  public loginForm: FormGroup;

  public constructor(
    public titleService: Title,
    public translation: TranslationService,
    public validation: ValidationService
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");
    let userNameMaxLength: number = 10;

    this.loginForm = new FormGroup ({
      userName: new FormControl('', [Validators.required, Validators.pattern(validation.pattern.LettersNumber), Validators.maxLength(userNameMaxLength)]),
      password: new FormControl('', [Validators.required]),
      stayLoggedIn: new FormControl(true)
    });
  }

  login(model: AccountLogin, isValid: boolean) {
    if(!isValid)
    {
      return;
    }
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