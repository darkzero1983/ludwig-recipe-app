import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RecipeOverview } from '../models/recipe.overview.model';
import { RecipeDetail } from '../models/recipe.detail.model';

import { environment } from '../../../../environments/environment';
import { AccountLoginInformation } from '../../../shared/authentification/account.login.information';

@Injectable()
export class RecipeService  {

    constructor(
        private http: HttpClient,
        public auth: AccountLoginInformation
    ) {
    }

    LoadOverview(count: number, skip: number, category: string, subCategory: string): Observable<RecipeOverview> {
        if(category == 'null' || category == null)
        {
            category = '';
        }
        if(subCategory == 'null' || subCategory == null)
        {
            subCategory = '';
        }
        
        let requestUrl: string = environment.useTestData ? environment.apiRecipeOverviewTest : environment.apiRecipeOverview + "?count=" + count + "&skip=" + skip + "&category=" + category + "&subCategory=" + subCategory;
        return this.http.get<RecipeOverview>(requestUrl);
    }

    LoadDetail(id: string): Observable<RecipeDetail> {
        let requestUrl: string = environment.apiRecipeDetail + id;
        return this.http.get<RecipeDetail>(requestUrl);
    }
}