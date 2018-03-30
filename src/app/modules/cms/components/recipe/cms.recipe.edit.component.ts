import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CmsService } from '../../services/cms.service';
import { RecipeEdit } from '../../models/recipe.edit.model';
import { RecipeContent } from '../../models/recipe.content.model';
import { RecipeContentType } from '../../models/recipe.content.type.enum';
import { FormControl, FormGroup, Validators, ValidationErrors, FormArray, FormBuilder  } from '@angular/forms';
import { Title }     from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { TranslationService } from '../../../../shared/services/translation.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { IngredientListItem } from '../../models/ingredient.list.item.model';
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
  public recipe: RecipeEdit = new RecipeEdit();
  private recipeValigation: CmsRecipeEditValidation;
  public ingredientSearchTerm: string = "";
  public measurementSearchTerm: string = "";
  private ingredients: string[];
  private measurements: string[];
  public recipeContentType: RecipeContentType;

  //Drag Optioons
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsService: CmsService,
    private titleService: Title,
    public translation: TranslationService,
    public validation: ValidationService,
    public accountLoginInformation: AccountLoginInformation,
    private formBuilder: FormBuilder
	) {
    this.recipeValigation = new CmsRecipeEditValidation(formBuilder);
    this.imageManagerDomain = environment.imageManagerDomain;
    this.recipeForm = null;

    route.paramMap.subscribe(
      params => {
          this.titleService.setTitle("Rezept Detail - Ludwigs Rezepte");
          this.cmsService.LoadMeasurements().subscribe(x => this.measurements = x);
          this.cmsService.LoadIngredients().subscribe(x => this.ingredients = x);
          this.cmsService.LoadRecipe(params.get('id')).subscribe(x => {
            this.recipe = x;
            this.recipeForm = this.recipeValigation.getRecipeForm(this.recipe);
            this.manageRecipeContentItems();
            this.ingredientListChange();
          });
        }
    );

    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

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
    } else if (output.type === 'start') {
      //Start Upload
    } else if (output.type === 'done') {
      this.recipe.teaserImageUrl = "/media/LudwigsRezepte/" + this.recipe.id + "/" +  this.files[0].name;
      this.files = [];
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
      headers: { 'Authorization': 'Bearer ' + token },
    };
    this.uploadInput.emit(event);
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
    this.cmsService.SaveRecipe(this.recipe).subscribe(x => this.router.navigate(['/CMS/Rezept/' + x]));
  }

  public ingredientListChange()
  {
    this.recipe = this.recipeForm.getRawValue();

    if(this.recipe.ingredientList == null)
    {
      return;
    }
    
    if(this.recipe.ingredientList.length > 0)
    {
      let item: IngredientListItem = this.recipe.ingredientList[this.recipe.ingredientList.length - 1];
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

  public isIngredientListItemEmpty(item : IngredientListItem): boolean
	{
		return (
			(item.amount == null || item.amount.toString() == "" || item.amount == 0) && 
			(item.ingredientName == null || item.ingredientName == "") && 
			(item.measurementName == null || item.measurementName == "")
		);
	}

  private addIngredientListItem()
  {
    this.recipe.ingredientList.push(new IngredientListItem());
    this.recipeForm = this.recipeValigation.getRecipeForm(this.recipe);
  }

  public deleteRecipe()
  {
    this.cmsService.DeleteRecipe(this.recipe.id).subscribe(x => {
      if(x)
      {
        this.router.navigate(['/CMS/Rezepte']);
      }
    });
  }

  public addRecipeContentHeadline()
  {
    this.addRecipeContent(RecipeContentType.headline)
  }
  public addRecipeContentSubHeadline()
  {
    this.addRecipeContent(RecipeContentType.subHeadline)
  }

  public addRecipeContentListItem()
  {
    this.addRecipeContent(RecipeContentType.listItem)
  }

  public addRecipeContent(type: RecipeContentType)
  {
    this.recipe = this.recipeForm.getRawValue();
    this.recipe.contentItems.push({
      id: 0,
      contentType: type,
      content: type.toString(),
      sortOrder: this.recipe.contentItems.length
    });

    this.recipe.contentItems.sort(function(a, b){
      return a.sortOrder == b.sortOrder ? 0 : +(a.sortOrder > b.sortOrder) || -1;
    });

    this.recipeForm.controls.contentItems = this.recipeValigation.getFormArray(this.recipe.contentItems);
  }

  public getRecipeContentPlaceholer(type: RecipeContentType)
  {
    switch(type)
    {
      case RecipeContentType.headline:
        return "Überschrift";
      case RecipeContentType.subHeadline:
        return "Zwischenüberschrift";
      case RecipeContentType.listItem:
        //return "Auflistung";
    }
  }

  public manageRecipeContentItems()
  {
    this.recipe = this.recipeForm.getRawValue();
    let changeItems: boolean = false;
    
    //Add default content
    if(this.recipe.contentItems.length == 0)
    {
      this.recipe.contentItems.push({id: 0, content: "Zubereitung", contentType: RecipeContentType.headline, sortOrder: 1});
      this.recipe.contentItems.push({id: 0, content: "", contentType: RecipeContentType.listItem, sortOrder: 2});
      this.recipe.contentItems.push({id: 0, content: "Guten Appetit!", contentType: RecipeContentType.subHeadline, sortOrder: 3});
      changeItems = true;
    }

    //Add ListItem if last item is not empty
    let addedContentCount: number = 0;
    let lastContent: RecipeContent = null;    
    for (let index = 0; index < this.recipe.contentItems.length; index++) {
      const contentItem = this.recipe.contentItems[index];
      
      if(index > 0 && contentItem.contentType != RecipeContentType.listItem && lastContent.contentType == RecipeContentType.listItem && lastContent.content != "")
      {
        //add between
        this.recipe.contentItems.push({
          id: 0,
          content: "",
          contentType: RecipeContentType.listItem,
          sortOrder: index
        });
        addedContentCount = addedContentCount + 1;
        contentItem.sortOrder = contentItem.sortOrder + addedContentCount;
        changeItems = true;
      }
      else if (index == this.recipe.contentItems.length -1 && contentItem.contentType == RecipeContentType.listItem && contentItem.content != "")
      {
        //add last
        this.recipe.contentItems.push({
          id: 0,
          content: "",
          contentType: RecipeContentType.listItem,
          sortOrder: index + 2
        });
        changeItems = true;
      }

      contentItem.sortOrder = contentItem.sortOrder + addedContentCount;
      lastContent = contentItem;
    }

    if(changeItems)
    {
      this.recipe.contentItems.sort(function(a, b){
        return a.sortOrder == b.sortOrder ? 0 : +(a.sortOrder > b.sortOrder) || -1;
      });
      this.recipeForm = this.recipeValigation.getRecipeForm(this.recipe);
    }
  }
}
