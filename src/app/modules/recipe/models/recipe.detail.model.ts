import { Measurement } from './measurement.model';
import { IngredientList } from './ingredient.list.model';
import { RecipeContent } from './recipe.content.model';

export class RecipeDetail {
	id: number;
	name: string;
	description: string;
	content: string;
	publishDate: string;
	teaserImageUrl: string;
	ingredientCount: number;
	measurement: Measurement;
	ingredients: IngredientList[];
	preparationTime: number;
	waitingTime: number;
	contentItems: RecipeContent[];
	
	constructor() {
		this.ingredients = new Array<IngredientList>();
		this.measurement = new Measurement();
	}
}