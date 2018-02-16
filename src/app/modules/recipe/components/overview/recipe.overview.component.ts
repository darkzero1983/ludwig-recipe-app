import { Component  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeOverview } from '../../models';
import { RecipeService } from '../../services';
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
  private paging: number[] = new Array<number>();
  private imageManagerDomain: string;
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

}
