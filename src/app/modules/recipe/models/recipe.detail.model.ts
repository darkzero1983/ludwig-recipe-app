import { Measurement } from './measurement.model';
import { IngredientList } from './ingredient.list.model';

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

	constructor() {
		this.ingredients = new Array<IngredientList>();
		this.measurement = new Measurement();
	}
}