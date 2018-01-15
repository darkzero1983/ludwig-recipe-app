import { Component } from '@angular/core';
import {  } from '../../shared_models';
import { AccountService } from '../../shared_services/account.service';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private isUserLoggedIn : boolean = false;

  constructor(
    private accountService: AccountService
  ) {
    console.info(accountService.isUserLoggedIn)
   }
}
