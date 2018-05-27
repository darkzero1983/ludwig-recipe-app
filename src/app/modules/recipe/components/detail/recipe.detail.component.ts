import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeDetail } from '../../models/recipe.detail.model';
import { RecipeContent } from '../../models/recipe.content.model';
import { RecipeContentType } from '../../models/recipe.content.type.enum';
import { environment } from '../../../../../environments/environment';
import { AccountLoginInformation } from '../../../../shared/authentification/account.login.information';

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
    private recipeService: RecipeService,
    public auth: AccountLoginInformation
  ) {
    this.imageManagerDomain = environment.imageManagerDomain;

    titleService.setTitle("Rezept Detail - Ludwigs Rezepte");

    route.paramMap.subscribe(
      params => {
        this.titleService.setTitle("Rezept Übersicht - Ludwigs Rezepte");
    
        this.recipeService.LoadDetail(params.get('id')).subscribe(x => {
          this.recipe = x;
          this.costumAmount = x.ingredientCount;
          this.replaceContentNumbers();
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
    this.recipe.contentItems.forEach(contentItem => {
      var match = contentItem.content.match(/\bd n="([^"]*)"/g);
      if (match != null) {
        for (var n = 0; n < match.length; n++) {
          var amount: number = Number(match[n].replace("d n=\"", "").replace("\"", ""));
          if (!isNaN(amount)) {
            
            var parse: string = "<d n=\"" + amount + "\">[^>]*<\/d>";
            var re = new RegExp(parse, "g");
            contentItem.content = contentItem.content.replace(re, "<d n=\"" + amount + "\">" + (amount / this.recipe.ingredientCount * this.costumAmount).toFixed(2).toString().replace(".", ",").replace(",00", "") + "<\/d>");
          }
        }
      }
    });
  }

  startOl(contents: RecipeContent[], index: number): boolean
  {
    if(index == 1 && contents[index].contentType == RecipeContentType.listItem)
    {
      return true;
    }
    return false;
  }
  stopOl(contents: RecipeContent[], index: number): boolean
  {
    if(index == 1 && contents[index].contentType == RecipeContentType.listItem)
    {
      return true;  
    }
    return false;
  }

}
