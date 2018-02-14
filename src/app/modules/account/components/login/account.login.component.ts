import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router} from '@angular/router';
import { FormControl, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { TranslationService } from '../../../../shared/services/translation.service';
import { AccountService } from '../../../../shared/authentification/account.service';
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
  private showErrorMessage:boolean = false;
  
  public constructor(
    public titleService: Title,
    public translation: TranslationService,
    public accountService: AccountService,
    public validation: ValidationService,
    private router: Router,
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
      return;
    }
    this.accountService.LoginUser(model).subscribe(loginSuccess => {
      if(loginSuccess)
      {
        this.router.navigate(['/']);
      }
    },
    err => {
     this.showErrorMessage = true;
    });
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