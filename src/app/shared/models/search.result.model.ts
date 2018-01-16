import { SearchResultRecipe } from './';

export class SearchResult {
	SearchTerm: string;
	Recipes: SearchResultRecipe[];
	constructor()
	{
		this.Recipes = new Array<SearchResultRecipe>();
	}
}