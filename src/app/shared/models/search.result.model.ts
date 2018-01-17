import { SearchResultRecipe } from './';

export class SearchResult {
	searchTerm: string;
	recipes: SearchResultRecipe[];
	constructor()
	{
		this.recipes = new Array<SearchResultRecipe>();
	}
}