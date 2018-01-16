import { Component } from '@angular/core';
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
    private navigationService: NavigationService
  ) { 
    this.navigationService.Load(false).subscribe(result => {this.navigation = result; console.info(result)});
  }

  activeMobileSearch() {
    //ToDo: Fill Function
  }
  deactivateMobileSearch()
  {
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
		//this.router.navigate(['RecipeDetail', { url: recipe.Url, id: recipe.Id }]);
		this.searchResult = new SearchResult();
		this.searchTerm = "";
		//$('body').removeClass('active-mobile-search');
	}
}
