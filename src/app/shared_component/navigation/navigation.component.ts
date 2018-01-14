import { Component } from '@angular/core';
import {  } from '../../shared_models';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private isUserLoggedIn : boolean = false;
}
