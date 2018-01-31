import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { TranslationService } from '../../../../shared/services';
import { AccountLogin } from '../../models/account.login.model';

@Component({
  selector: 'account-login-component',
  templateUrl: './account.login.component.html',
  styleUrls: ['./account.login.component.less']
})
export class AccountLoginComponent {
  private hide:boolean = true;
  private isGerman: boolean = true;
  private allPattern: string[] = new Array<string>("^[a-zA-Z]+$", "^[a-zA-Z0-9]+$")
  private loginForm = new FormGroup ({
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required]),
    stayLoggedIn: new FormControl(true, Validators.required)
  });

  public constructor(
    private titleService: Title,
    private translation: TranslationService 
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");
  }

  login(model: AccountLogin, isValid: boolean) {
    this.languageTest();
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

  showError(error: ValidationErrors):boolean
  {
    return (error != null);
  }
  errorMessage(error: ValidationErrors):string
  {
    if(error.required != null)
    {
      return this.translation.get('FormControl.Error.Required');
    }
    if(error.maxlength != null)
    {
      return this.translation.get('FormControl.Error.MaxLength', [error.maxlength.actualLength, error.maxlength.requiredLength]);
    }
    if(error.pattern != null)
    {
      switch(error.pattern.requiredPattern)
      {
        case "^[a-zA-Z]+$":
          return this.translation.get('FormControl.Error.Pattern.Letters');
        case "^[a-zA-Z0-9]+$":
          return this.translation.get('FormControl.Error.Pattern.LettersNumber');
      }
      return this.translation.get('FormControl.Error.Pattern.Default');
    }
    return "";
  }
}
