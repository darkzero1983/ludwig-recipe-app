import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation, SearchResult, SearchResultRecipe } from '../../models';
import { NavigationService } from '../../services/navigation.service';
import { AccountLoginInformation } from '../../authentification/account.login.information';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent {
  searchTerm: string = "";
  searchResult: SearchResult = new SearchResult();
  navigation: Navigation = new Navigation();
  constructor(
    public auth: AccountLoginInformation,
    public navigationService: NavigationService,
    private router: Router
  ) { 
    this.navigationService.Load(false).subscribe(result => {this.navigation = result;});
  }

  changeSearchTerm() {
		if (this.searchTerm.length < 1)
		{
			this.searchResult = new SearchResult();
			return;
    }
    
		this.navigationService.Search(this.searchTerm).subscribe((result: SearchResult) => {
			if (result.searchTerm == this.searchTerm) {
				this.searchResult = result;
			}
    });
    
    return true;
  }
  
  openMobileMenu(){

  }
  
  selectSearchResult(recipe: SearchResultRecipe)
	{
		this.searchResult = new SearchResult();
    this.searchTerm = "";
    this.navigationService.isMobileSearchActive = false;
	}
}
