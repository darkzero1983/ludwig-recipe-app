import { Component } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private navigationService: NavigationService
  ) { 
  }
}
