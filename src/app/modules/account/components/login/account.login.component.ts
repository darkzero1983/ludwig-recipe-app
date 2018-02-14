import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
  private returnUrl: string;

 
  public constructor(
    public titleService: Title,
    public translation: TranslationService,
    public accountService: AccountService,
    public validation: ValidationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    titleService.setTitle("Einloggen - Ludwigs Rezepte");
    
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
      {
        this.returnUrl = this.route.snapshot.paramMap.get('returnUrl');
      }
    });

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
        if(this.returnUrl == null)
        {
          this.returnUrl = "/";
        }
        console.info('redirect to: ' + this.returnUrl);
        this.router.navigate([this.returnUrl]);
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