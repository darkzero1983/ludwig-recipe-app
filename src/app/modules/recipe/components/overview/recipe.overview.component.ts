import { Component } from '@angular/core';
import { RecipeOverview } from '../../models';
import { RecipeService } from '../../services';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'recipe-overview-component',
  templateUrl: './recipe.overview.component.html',
  styleUrls: ['./recipe.overview.component.less']
})
export class RecipeOverviewComponent {
  private resultsPerPage: number = 10;
  private paging: number[] = new Array<number>();
  categoryUrl: string;
  subCategoryUrl: string;
  recipeOverview: RecipeOverview = new RecipeOverview();

  constructor(
    private recipeService: RecipeService,
    private titleService: Title 
	) {
    titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
    recipeService.LoadOverview(this.resultsPerPage, 0, "", "").subscribe(x => this.recipeOverview = x);
	}
}
