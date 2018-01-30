import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { RecipeOverview } from '../models';

import { environment } from '../../../../environments/environment';

@Injectable()
export class RecipeService  {

    constructor(
        private http: HttpClient
    ) {
    }

    LoadOverview(count: number, skip: number, category: string, subCategory: string): Observable<RecipeOverview> {
        return this.http.get<RecipeOverview>(environment.useTestData ? environment.apiRecipeOverviewTest : environment.apiRecipeOverview + "?count=" + count + "&skip=" + skip + "&category=" + category + "&subCategory=" + subCategory);
    }
}