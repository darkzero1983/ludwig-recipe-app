import { Component  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CmsService } from '../../services/cms.service';
import { RecipeEdit } from '../../models/recipe.edit.model';
import { FormControl, FormGroup, Validators, ValidationErrors, FormArray, FormBuilder  } from '@angular/forms';
import { Title }     from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { TranslationService } from '../../../../shared/services/translation.service';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'cms-recipe-edit-component',
  templateUrl: './cms.recipe.edit.component.html',
  styleUrls: ['./cms.recipe.edit.component.less']
})
export class CmsRecipeEditComponent {
  private imageManagerDomain: string;
  public recipeForm : FormGroup;
  public nameMaxLength: number = 500;
  public recipe:RecipeEdit = new RecipeEdit();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsService: CmsService,
    private titleService: Title,
    public translation: TranslationService,
    public validation: ValidationService,
	) {
    this.imageManagerDomain = environment.imageManagerDomain;
    
    this.recipeForm = new FormGroup ({
      id: new FormControl(0, [Validators.required]),
      isPublished: new FormControl(false, [Validators.required]),
      isOnlyForFriends: new FormControl("", []),
      publishDate: new FormControl("", []),
      publishHour: new FormControl("", []),
      publishMinute: new FormControl("", []),
      name: new FormControl("", [Validators.required, Validators.maxLength(this.nameMaxLength)]),
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
    });

    route.paramMap.subscribe(
      params => {
          this.titleService.setTitle("Rezept Detail - Ludwigs Rezepte");
          this.cmsService.LoadRecipe(params.get('id')).subscribe(x => {
            this.recipe = x;
            
            this.recipeForm.controls.ingredientList = this.ingredientListArray(x.ingredientList.length);
            this.recipeForm.setValue(this.recipe);
          });
        }
    );
  }

  savRecipe(recipe: RecipeEdit, isValid: boolean) {
    
    console.info(recipe);
  }

  ingredientListArray(listCount: number) : FormArray
  {
    let ingredientList: FormGroup[] = new Array<FormGroup>();
    for (var _i = 0; _i < listCount; _i++) {
      ingredientList.push(
        new FormGroup ({
          id: new FormControl(0, []),
          amount: new FormControl(0, []),
          measurementId: new FormControl(0, []),
          measurementName: new FormControl("", []),
          ingredientId: new FormControl(0, []),
          ingredientName: new FormControl("", []),
        })
      )
    }
    return new FormArray(ingredientList);
  }

  amountChange(value: number, id: number)
  {
    this.recipe = this.recipeForm.value;
    this.recipe.ingredientList[id].amount = value;
    this.recipeForm.setValue(this.recipe);
  }

  measurementNameChange(value: string, id: number)
  {
    this.recipe = this.recipeForm.value;
    this.recipe.ingredientList[id].measurementName = value;
    this.recipeForm.setValue(this.recipe);
  }

  ingredientNameChange(value: string, id: number)
  {
    this.recipe = this.recipeForm.value;
    this.recipe.ingredientList[id].ingredientName = value;
    this.recipeForm.setValue(this.recipe);
  }
}
