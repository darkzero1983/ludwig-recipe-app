import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { RecipeOverview } from '../models';

@Injectable()
export class RecipeService  {

    constructor(
        private http: HttpClient
    ) {
    }

    LoadOverview(): Observable<RecipeOverview> {
        var url = "/test_data/recipe-overview.json";
        return this.http.get<RecipeOverview>(url);
    }

}