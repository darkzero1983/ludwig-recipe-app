import { Component  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeOverview } from '../../models';
import { RecipeService } from '../../services';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'recipe-overview-component',
  templateUrl: './recipe.overview.component.html',
  styleUrls: ['./recipe.overview.component.less']
})
export class RecipeOverviewComponent  {
  private resultsPerPage: number = 10;
  private paging: number[] = new Array<number>();
  categoryUrl: string;
  subCategoryUrl: string;
  recipeOverview: RecipeOverview = new RecipeOverview();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private titleService: Title 
	) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
      {
        this.categoryUrl = this.route.snapshot.paramMap.get('categoryUrl');
        this.subCategoryUrl = this.route.snapshot.paramMap.get('subCategoryUrl');

        this.titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
        this.recipeService.LoadOverview(this.resultsPerPage, 0, this.categoryUrl, this.subCategoryUrl).subscribe(x => this.recipeOverview = x);
      }
    });
  }
}
