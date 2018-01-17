import { Paging } from "../../../shared/models";
import { RecipeOverviewRecipe } from "./";

export class RecipeOverview {
	title: string;
	paging: Paging;
	recipes: RecipeOverviewRecipe[];

	constructor() {
		this.paging = new Paging();
	}
}