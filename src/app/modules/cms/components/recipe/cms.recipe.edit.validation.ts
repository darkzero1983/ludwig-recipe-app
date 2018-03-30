import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { IngredientListItem } from '../../models/ingredient.list.item.model';
import { Category } from '../../models/category.model';
import { SubCategory } from '../../models/sub.category.model';
import { RecipeContent } from '../../models/recipe.content.model';
import { RecipeEdit } from '../../models/recipe.edit.model';

export class CmsRecipeEditValidation {
    private formBuilder: FormBuilder;
    
    constructor(_formBuilder: FormBuilder) {
        this.formBuilder = _formBuilder;
    }

    public getRecipeForm(recipe: RecipeEdit): FormGroup
    {
        let formGroup: FormGroup = this.formBuilder.group(recipe);
        
        //Arrays
        formGroup.controls.ingredientList = this.getFormArray(recipe.ingredientList);
        formGroup.controls.categories = this.getCategoryArray(recipe.categories);
        formGroup.controls.contentItems = this.getFormArray(recipe.contentItems);

        //Validators
        formGroup.controls.isPublished.setValidators([Validators.required])
        formGroup.controls.name.setValidators([Validators.required, Validators.maxLength(500)])
        return formGroup;
    }

    public getFormArray(items: any[]) : FormArray
    {
        let result: FormGroup[] = new Array<FormGroup>();
        if(items != undefined)
        {
            items.forEach(item => {
                result.push( this.formBuilder.group(item));
            });
        }
        return this.formBuilder.array(result);
    }

    private getCategoryArray(items: Category[]) : FormArray
    {
        let result: FormGroup[] = new Array<FormGroup>();
        items.forEach(item => {
            let group: FormGroup = this.formBuilder.group(item);
            group.controls.subCategories = this.getFormArray(item.subCategories);
            result.push(group);
        });
        return this.formBuilder.array(result);
    }
}