import { Component  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeOverview } from '../../../recipe/models/recipe.overview.model';
import { CmsService } from '../../services/cms.service';
import { Title }     from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'cms-recipe-overview-component',
  templateUrl: './cms.recipe.overview.component.html',
  styleUrls: ['./cms.recipe.overview.component.less']
})
export class CmsRecipeOverviewComponent {
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
    private cmsService: CmsService,
    private titleService: Title,
    
	) {
    this.imageManagerDomain = environment.imageManagerDomain;

    route.paramMap.subscribe(
      params => {
          this.titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
          this.cmsService.LoadOverview(this.resultsPerPage, 0).subscribe(x => this.recipeOverview = x);
        }
     );
    
  }

  loadRecipes(page: number)
  {
    this.currentPage = page;
    this.cmsService.LoadOverview(this.resultsPerPage, (page * this.resultsPerPage) - this.resultsPerPage).subscribe(x => this.recipeOverview = x);
  }

  private pageItems(): Array<number>
  {
    let items: number[] = new Array<number>();
    for (var _i = 1; _i <= this.pageCount(); _i++) {
      items.push(_i);
    }
    return items;
  }

  public pageCount(): number
  {
    return this.precisionRound(this.recipeOverview.count / this.resultsPerPage, 0)
  }
  private precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
}
