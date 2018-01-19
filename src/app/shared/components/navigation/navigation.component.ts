import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation, SearchResult, SearchResultRecipe } from '../../models';
import { AccountService, NavigationService } from '../../services';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  searchTerm: string = "";
  searchResult: SearchResult = new SearchResult();
  navigation: Navigation = new Navigation();
  constructor(
    public accountService: AccountService,
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
