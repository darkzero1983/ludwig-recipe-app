import { FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';

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
            measurement:  new FormControl ({
              id: new FormControl(0, []),
              name: new FormControl("", []),
            }),
            ingredientList: new FormArray ([]),
            authors: new FormControl("", []),
            seoTags: new FormControl("", []),
            categories: new FormControl("", []),
            preparationTime: new FormControl("", []),
            waitingTime: new FormControl("", []),
          });;
    }

    public getIngredientListArray(listCount: number) : FormArray
    {
        let ingredientList: FormGroup[] = new Array<FormGroup>();
        for (var _i = 0; _i < listCount; _i++) {
            ingredientList.push(
            new FormGroup ({
                id: new FormControl(0, []),
                amount: new FormControl(0, []),
                measurementName: new FormControl("", []),
                ingredientName: new FormControl("", []),
            })
            )
        }
        return new FormArray(ingredientList);
    }
}