import { Component, EventEmitter } from '@angular/core';
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
import { UploadOutput, UploadFile, UploadInput, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { AccountLoginInformation } from '../../../../shared/authentification/account.login.information';

@Component({
  selector: 'cms-recipe-edit-component',
  templateUrl: './cms.recipe.edit.component.html',
  styleUrls: ['./cms.recipe.edit.component.less']
})
export class CmsRecipeEditComponent {
  public imageManagerDomain: string;
  public recipeForm : FormGroup;
  public nameMaxLength: number = 500;
  public recipe:RecipeEdit = new RecipeEdit();
  private recipeValigation: CmsRecipeEditValidation = new CmsRecipeEditValidation();
  public ingredientSearchTerm: string = "";
  public measurementSearchTerm: string = "";
  private ingredients: string[];
  private measurements: string[];
  
  //Drag Optioons
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      this.startUpload();
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }
  openTeaserImageUpload()
  {
    let element: HTMLElement = document.getElementById('teaser-image-upload-input') as HTMLElement;
    element.click();
  }
  startUpload(): void {
    let token = this.accountLoginInformation.getAccessToken();  // <----  get token
    const event: UploadInput = {
      type: 'uploadAll',
      url: environment.apiCmsUploadTeaserImage + this.recipe.id.toString(),
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    };
  
    this.uploadInput.emit(event);
    this.recipe.teaserImageUrl = "/media/LudwigsRezepte/" + this.recipe.id + "/" +  this.files[0].name
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsService: CmsService,
    private titleService: Title,
    public translation: TranslationService,
    public validation: ValidationService,
    public accountLoginInformation: AccountLoginInformation
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
            this.recipeForm.controls.ingredientList = this.recipeValigation.getIngredientListArray(this.recipe.ingredientList);
            this.recipeForm.setValue(x);
            this.ingredientListChange();
          });
        }
    );

    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
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

  saveRecipe() {
    if(!this.recipeForm.valid)
    {
      return;
    }
    this.recipe = this.recipeForm.getRawValue();
    console.info(this.recipe);
  }

  public ingredientListChange()
  {
    if(this.recipe.ingredientList == null)
    {
      return;
    }
    
    if(this.recipeForm.getRawValue().ingredientList.length > 0)
    {
      let item: IngredientListItem = this.recipeForm.getRawValue().ingredientList[this.recipeForm.getRawValue().ingredientList.length - 1];
      if(item == undefined)
      {
        return;
      }
      if(!this.isIngredientListItemEmpty(item))
      {
        this.addIngredientListItem();
      }
    }
    else
    {
      this.addIngredientListItem();
    }
    
  }

  private addIngredientListItem()
  {
    const control = <FormArray>this.recipeForm.controls['ingredientList'];
    control.push(new FormGroup ({
        id: new FormControl(),
        amount: new FormControl(),
        measurementName: new FormControl(),
        ingredientName: new FormControl()
    }));
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
