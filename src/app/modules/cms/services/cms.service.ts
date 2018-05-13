import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountLoginInformation } from '../../../shared/authentification/account.login.information';
import { RecipeOverview } from '../../recipe/models/recipe.overview.model';
import { RecipeEdit } from '../models/recipe.edit.model';

@Injectable()
export class CmsService  {

    constructor(
        private http: HttpClient,
        public auth: AccountLoginInformation
    ) {
    }

    LoadOverview(count: number, skip: number): Observable<RecipeOverview> {
        let requestUrl: string = environment.apiCmsRecipeOverview + "?count=" + count + "&skip=" + skip;
        return this.http.get<RecipeOverview>(requestUrl);
    }

    LoadRecipe(id: string): Observable<RecipeEdit> {
        let requestUrl: string = environment.apiCmsRecipe + id;
        return this.http.get<RecipeEdit>(requestUrl);
    }

    SaveRecipe(recipe: RecipeEdit): Observable<number> {
        let requestUrl: string = environment.apiCmsRecipe;
        return this.http.post<number>(requestUrl, recipe);
    }

    DeleteRecipe(id: number): Observable<Boolean> {
        let requestUrl: string = environment.apiCmsDeleteRecipe + id;
        return this.http.get<Boolean>(requestUrl);
    }

    LoadIngredients(): Observable<string[]> {
        let requestUrl: string = environment.apiCmsIngredients;
        return this.http.get<Array<string>>(requestUrl);
    }

    LoadMeasurements(): Observable<string[]> {
        let requestUrl: string = environment.apiCmsMeasurements;
        return this.http.get<Array<string>>(requestUrl);
    }
}