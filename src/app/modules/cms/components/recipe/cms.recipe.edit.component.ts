import { Component  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CmsService } from '../../services/cms.service';
import { RecipeEdit } from '../../models/recipe.edit.model';
import { FormControl, FormGroup, Validators, ValidationErrors, FormArray, FormBuilder  } from '@angular/forms';
import { Title }     from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { TranslationService } from '../../../../shared/services/translation.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { IngredientListItem } from '../../models/ingredient.listI.iem.model';
import { CmsRecipeEditValidation } from './cms.recipe.edit.validation';

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
  private recipeValigation: CmsRecipeEditValidation = new CmsRecipeEditValidation();
  public ingredientSearchTerm: string = "";
  public measurementSearchTerm: string = "";
  private ingredients: string[];
  private measurements: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsService: CmsService,
    private titleService: Title,
    public translation: TranslationService,
    public validation: ValidationService,
	) {
    this.imageManagerDomain = environment.imageManagerDomain;
    this.recipeForm = this.recipeValigation.getRecipeForm(this.nameMaxLength);

    route.paramMap.subscribe(
      params => {
          this.titleService.setTitle("Rezept Detail - Ludwigs Rezepte");
          this.cmsService.LoadMeasurements().subscribe(x => this.measurements = x);
          this.cmsService.LoadIngredients().subscribe(x => this.ingredients = x);
          this.cmsService.LoadRecipe(params.get('id')).subscribe(x => {
            this.recipe = x;
            this.recipeForm.controls.ingredientList = this.recipeValigation.getIngredientListArray(this.recipe.ingredientList.length);
            this.recipeForm.setValue(this.recipe);
            this.ingredientListChange();
          });
        }
    );
  }
  ingredientOptions(): string[]
  {
    if(this.ingredientSearchTerm == "")
    {
      return [];
    }
    return this.ingredients.filter(x => x.toLowerCase().indexOf(this.ingredientSearchTerm.toLocaleLowerCase()) >= 0);
  }
  setIngredientSearchTerm(term: string)
  {
    this.ingredientSearchTerm = term;
  }

  measurementOptions(): string[]
  {
    if(this.measurementSearchTerm == "")
    {
      return [];
    }
    return this.measurements.filter(x => x.toLowerCase().indexOf(this.measurementSearchTerm.toLocaleLowerCase()) >= 0);
  }
  setMeasurementSearchTerm(term: string)
  {
    this.measurementSearchTerm = term;
  }

  savRecipe(recipe: RecipeEdit, isValid: boolean) {
    console.info(recipe);
  }

  amountChange(value: number, id: number)
  {
    this.recipe = this.recipeForm.value;
    this.recipe.ingredientList[id].amount = value;
    this.recipeForm.setValue(this.recipe);
    this.ingredientListChange();
  }

  measurementNameChange(value: string, id: number)
  {
    this.recipe = this.recipeForm.value;
    this.recipe.ingredientList[id].measurementName = value;
    this.recipeForm.setValue(this.recipe);
    this.ingredientListChange();
  }

  ingredientNameChange(value: string, id: number)
  {
    this.recipe = this.recipeForm.value;
    this.recipe.ingredientList[id].ingredientName = value;
    this.recipeForm.setValue(this.recipe);
    this.ingredientListChange();
  }

  public ingredientListChange()
  {
    if(this.recipe.ingredientList == null)
    {
      return;
    }
    
    for (var _i = 0; _i < this.recipe.ingredientList.length - 1; _i++) {
      if(this.recipe.ingredientList[_i] != null)
      {
        if(this.isIngredientListItemEmpty(this.recipe.ingredientList[_i]))
        {
          /*
          this.recipe.ingredientList = this.recipe.ingredientList.filter(obj => obj !== this.recipe.ingredientList[_i]);
          this.recipeForm.controls.ingredientList = this.recipeValigation.getIngredientListArray(this.recipe.ingredientList.length);
          this.recipeForm.setValue(this.recipe);
          _i = _i -1;
          */
        }
      }
    };
    
    if( this.recipe.ingredientList.length > 0)
    {
      let item: IngredientListItem = this.recipe.ingredientList[this.recipe.ingredientList.length-1];
      if(item == undefined)
      {
        return;
      }
      if(!this.isIngredientListItemEmpty(item))
      {
        //this.recipe.ingredientList.push({id: this.recipe.ingredientList.length, amount: 0, measurementName: "", ingredientName: ""});
        //this.recipeForm.controls.ingredientList = this.recipeValigation.getIngredientListArray(this.recipe.ingredientList.length);
        //this.recipeForm.setValue(this.recipe);
      }
    }
    
  }

  private isIngredientListItemEmpty(item: IngredientListItem): boolean
  {
    if(item == null || item == undefined)
    {
      return true;
    }
    return (
      (item.amount == null || item.amount.toString() == "" || item.amount == 0) && 
      (item.ingredientName == null ||item.ingredientName == "") && 
      (item.measurementName == null || item.measurementName == "")
    );
  }
}
