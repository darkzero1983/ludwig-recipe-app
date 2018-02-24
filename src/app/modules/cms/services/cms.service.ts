import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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
}