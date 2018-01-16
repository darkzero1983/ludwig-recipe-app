import { Paging } from "../../../shared/models"
import { RecipeOverviewRecipe } from "./"

export class RecipeOverview {
	Title: string;
	Paging: Paging;
	Recipes: RecipeOverviewRecipe[];

	constructor() {
		this.Paging = new Paging();
	}
}