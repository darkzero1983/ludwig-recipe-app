import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeDetail } from '../../models/recipe.detail.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'recipe-detail-component',
  templateUrl: './recipe.detail.component.html',
  styleUrls: ['./recipe.detail.component.less'],
})
export class RecipeDetailComponent {
  public recipe: RecipeDetail;
  public costumAmount: number;
  private imageManagerDomain: string;

  public constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.imageManagerDomain = environment.imageManagerDomain;

    titleService.setTitle("Rezept Detail - Ludwigs Rezepte");

    route.paramMap.subscribe(
      params => {
        this.titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
    
        this.recipeService.LoadDetail(params.get('id')).subscribe(x => {
          this.recipe = x;
          this.costumAmount = x.ingredientCount;
        });
      }
    );
  }

  addCostumAmount()
	{
		this.costumAmount = parseInt(this.costumAmount.toString()) + 1;
		this.replaceContentNumbers();
	}
  subtractCostumAmount() {
    this.costumAmount = parseInt(this.costumAmount.toString()) - 1;
    this.replaceContentNumbers();
  }
  replaceContentNumbers() {
    
    var match = this.recipe.content.match(/\bd n="([^"]*)"/g);
    if (match != null) {
      for (var n = 0; n < match.length; n++) {
        var amount: number = Number(match[n].replace("d n=\"", "").replace("\"", ""));
        if (!isNaN(amount)) {
          
          var parse: string = "<d n=\"" + amount + "\">[^>]*<\/d>";
          var re = new RegExp(parse, "g");
          this.recipe.content = this.recipe.content.replace(re, "<d n=\"" + amount + "\">" + (amount / this.recipe.ingredientCount * this.costumAmount).toFixed(2).toString().replace(".", ",").replace(",00", "") + "<\/d>");
        }
      }
    }
  }
}
