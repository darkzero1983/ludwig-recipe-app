import { Component } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
//import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public navigationService: NavigationService,
    //private titleService: Title 
  ) { 
    //titleService.setTitle("Ludwigs Rezepte");
  }
}
