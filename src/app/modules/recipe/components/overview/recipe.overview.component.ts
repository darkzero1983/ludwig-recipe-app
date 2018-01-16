import { Component } from '@angular/core';
import { RecipeOverview } from '../../models';
import { RecipeService } from '../../services';

@Component({
  selector: 'recipe-overview-component',
  templateUrl: './recipe.overview.component.html',
  styleUrls: ['./recipe.overview.component.css']
})
export class RecipeOverviewComponent {
  paging: number[] = new Array<number>();
  categoryUrl: string;
  subCategoryUrl: string;
  recipeOverview: RecipeOverview = new RecipeOverview();

  constructor(
    private recipeService: RecipeService
	) {
    recipeService.LoadOverview().subscribe(x => this.recipeOverview = x);
	}
}
