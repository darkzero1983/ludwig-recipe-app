import { SubCategory } from './sub.category.model';

export class Category {
	id: number;
	name: string;
	isSelected: boolean;
	subCategories: SubCategory[];

	constructor() {
		this.subCategories = new Array<SubCategory>();
	}
}