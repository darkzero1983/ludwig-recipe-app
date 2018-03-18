import { IdName } from '../../../shared/models/id.name.model';
import { Category } from './category.model';
import { IngredientListItem } from './ingredient.list.item.model';

export class RecipeEdit {
	id: number;
	isPublished: boolean;
	isOnlyForFriends: boolean;
	publishDate: string;
	publishHour: number;
	publishMinute: number;
	name: string;
	description: string;
	content: string;
	teaserImageUrl: string;
	ingredientCount: number;
	measurement: IdName;
	ingredientList: IngredientListItem[];
	authors: IdName[];
	seoTags: IdName[];
	categories: Category[];
	preparationTime: number;
	waitingTime: number;

	constructor() {
		this.ingredientList = new Array<IngredientListItem>();
		this.authors = new Array<IdName>();
		this.seoTags = new Array<IdName>();
		this.categories = new Array<Category>();
		this.measurement = new IdName();
	}
}