import { FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';
import { IngredientListItem } from '../../models/ingredient.list.item.model';
import { Category } from '../../models/category.model';

export class CmsRecipeEditValidation {
    public getRecipeForm(nameMaxLength: number): FormGroup
    {
        return  new FormGroup ({
            id: new FormControl(0, [Validators.required]),
            isPublished: new FormControl(false, [Validators.required]),
            isOnlyForFriends: new FormControl("", []),
            publishDate: new FormControl("", []),
            publishHour: new FormControl("", []),
            publishMinute: new FormControl("", []),
            name: new FormControl("", [Validators.required, Validators.maxLength(nameMaxLength)]),
            description: new FormControl("", []),
            content: new FormControl("", []),
            teaserImageUrl: new FormControl("", []),
            ingredientCount: new FormControl("", []),
            measurement:  new FormControl (""),
            ingredientList: new FormArray ([]),
            authors: new FormControl("", []),
            seoTags: new FormControl("", []),
            categories: new FormArray([]),
            preparationTime: new FormControl("", []),
            waitingTime: new FormControl("", []),
          });;
    }

    public getIngredientListArray(items: IngredientListItem[]) : FormArray
    {
        let ingredientList: FormGroup[] = new Array<FormGroup>();
        items.forEach(item => {
            if(item != undefined)
            {
                ingredientList.push(
                    new FormGroup ({
                        id: new FormControl(item.id, []),
                        amount: new FormControl(item.amount, []),
                        measurementName: new FormControl(item.measurementName, []),
                        ingredientName: new FormControl(item.ingredientName, [])
                    })
                )
            }
        });
        return new FormArray(ingredientList);
    }

    public getCategoryArray(items: Category[]) : FormArray
    {
        let categories: FormGroup[] = new Array<FormGroup>();
        
        items.forEach(item => {
            if(item != undefined)
            {
                let categoryFormGroup : FormGroup = new FormGroup ({
                    id: new FormControl(item.id, []),
                    name: new FormControl(item.name, []),
                    isSelected: new FormControl(item.isSelected, []),
                    subCategories: new FormArray ([])
                });
                let subCategories: FormGroup[] = new Array<FormGroup>();

                item.subCategories.forEach(subItem => {
                    subCategories.push(new FormGroup ({
                        id: new FormControl(subItem.id, []),
                        name: new FormControl(subItem.name, []),
                        isSelected: new FormControl(subItem.isSelected, [])
                    }))
                });
                categoryFormGroup.controls.subCategories = new FormArray(subCategories);
                categories.push(categoryFormGroup);
                
            }
        });
        console.info(new FormArray(categories));
        return new FormArray(categories);
    }
}