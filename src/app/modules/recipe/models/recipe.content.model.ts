import { RecipeContentType } from './recipe.content.type.enum';

export class RecipeContent
{
    id: number;
    contentType: RecipeContentType;
    content: string;
    sortOrder: number
}