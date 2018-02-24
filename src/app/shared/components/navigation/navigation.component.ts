import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation, SearchResult, SearchResultRecipe } from '../../models';
import { NavigationService } from '../../services/navigation.service';
import { AccountLoginInformation } from '../../authentification/account.login.information';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent {
  searchTerm: string = "";
  searchResult: SearchResult = new SearchResult();
  navigation: Navigation = new Navigation();
  private imageManagerDomain: string;

  constructor(
    public auth: AccountLoginInformation,
    public navigationService: NavigationService,
    private router: Router
  ) { 
    this.imageManagerDomain = environment.imageManagerDomain;
    this.navigationService.Load(false).subscribe(result => {this.navigation = result;});
  }

  changeSearchTerm() {
		if (this.searchTerm.length < 1)
		{
      this.searchResult = new SearchResult();
      this.navigationService.isMobileSearchActive = false;
			return;
    }
    
    this.navigationService.isMobileSearchActive = true;
		this.navigationService.Search(this.searchTerm).subscribe((result: SearchResult) => {
			if (result.searchTerm == this.searchTerm) {
				this.searchResult = result;
			}
    });
    
    return true;
  }
  
  openMobileMenu(){

  }
  
  clearSearchResult()
	{
		this.searchResult = new SearchResult();
    this.searchTerm = "";
    this.navigationService.isMobileSearchActive = false;
	}
}
