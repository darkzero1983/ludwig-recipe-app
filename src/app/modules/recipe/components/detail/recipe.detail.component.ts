import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'recipe-detail-component',
  templateUrl: './recipe.detail.component.html',
  styleUrls: ['./recipe.detail.component.less']
})
export class RecipeDetailComponent {
  public constructor(
    private titleService: Title 
  ) {
    titleService.setTitle("Rezept Detail - Ludwigs Rezepte");
   }
}
