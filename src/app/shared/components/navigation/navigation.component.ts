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
    private accountService: AccountService,
    private navigationService: NavigationService,
    private router: Router
  ) { 
    this.navigationService.Load(false).subscribe(result => {this.navigation = result;});
  }

  activeMobileSearch() {
    this.navigationService.isMobileSearchActive = true;
    //ToDo: Fill Function
  }
  deactivateMobileSearch()
  {
    this.navigationService.isMobileSearchActive = false;
    //ToDo: Fill Function
  }

  changeSearchTerm() {
		if (this.searchTerm.length < 1)
		{
			this.searchResult = new SearchResult();
			return;
    }
    /*
		this.navigationService.Search(this.searchTerm).subscribe((result: SearchResultViewModel) => {
			if (result.SearchTerm == this.searchTerm) {
				this.globalVariables.SearchResult = result;
			}
    });
    */
		return true;
  }
  
  selectSearchResult(recipe: SearchResultRecipe)
	{
		this.router.navigate(['/Rezepte', { url: recipe.Url, id: recipe.Id }]);
		this.searchResult = new SearchResult();
    this.searchTerm = "";
    this.navigationService.isMobileSearchActive = false;
	}
}
