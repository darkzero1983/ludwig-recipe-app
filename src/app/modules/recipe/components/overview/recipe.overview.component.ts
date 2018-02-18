import { Component  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeOverview } from '../../models/recipe.overview.model';
import { RecipeService } from '../../services/recipe.service';
import { Title }     from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'recipe-overview-component',
  templateUrl: './recipe.overview.component.html',
  styleUrls: ['./recipe.overview.component.less']
})
export class RecipeOverviewComponent {
  private hasSubscript: boolean = false;
  private resultsPerPage: number = 10;
  private imageManagerDomain: string;
  private currentPage: number = 1;
  categoryUrl: string;
  subCategoryUrl: string;
  recipeOverview: RecipeOverview = new RecipeOverview();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private titleService: Title,
    
	) {
    this.imageManagerDomain = environment.imageManagerDomain;

    route.paramMap.subscribe(
      params => {
          this.categoryUrl = params.get('categoryUrl');
          this.subCategoryUrl = params.get('subCategoryUrl');

          this.titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
          this.recipeService.LoadOverview(this.resultsPerPage, 0, this.categoryUrl, this.subCategoryUrl).subscribe(x => this.recipeOverview = x);
        }
     );
    
  }

  loadRecipes(page: number)
  {
    this.currentPage = page;
    this.recipeService.LoadOverview(this.resultsPerPage, (page * this.resultsPerPage) - this.resultsPerPage, this.categoryUrl, this.subCategoryUrl).subscribe(x => this.recipeOverview = x);
  }

  private pageItems(): Array<number>
  {
    let items: number[] = new Array<number>();
    for (var _i = 1; _i <= this.pageCount(); _i++) {
      items.push(_i);
    }
    return items;
  }

  private pageCount(): number
  {
    return this.precisionRound(this.recipeOverview.count / this.resultsPerPage, 0)
  }
  private precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

}
