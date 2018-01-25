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
  paging: number[] = new Array<number>();
  categoryUrl: string;
  subCategoryUrl: string;
  recipeOverview: RecipeOverview = new RecipeOverview();

  constructor(
    private recipeService: RecipeService,
    private titleService: Title 
	) {
    titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
    recipeService.LoadOverview().subscribe(x => this.recipeOverview = x);
	}
}
