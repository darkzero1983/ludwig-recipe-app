import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Navigation, SearchResult } from '../models';

@Injectable()
export class NavigationService  {
    public isMobileSearchActive: boolean = false;

    constructor(
        private http: HttpClient
    ) {
    }

    public Load(cmsVersion: boolean): Observable<Navigation> {
        var url: string = environment.useTestData ? environment.apiNavigationTest : environment.apiNavigation;
        if (cmsVersion) {
            url = url + '?cmsVersion=true';
        }
        return this.http.get<Navigation>(url);
    }

    public Search(term: string): Observable<SearchResult> {
        let myData = JSON.stringify(term);
        if(environment.useTestData)
        {
            return this.http.get<SearchResult>(environment.apiRecipeSearchTest);
        }
        else
        {
            return this.http.post<SearchResult>(environment.apiRecipeSearch, myData);
        }
        
    }

    public activeMobileSearch() {
        this.isMobileSearchActive = true;
        //ToDo: Fill Function
    }

    public deactivateMobileSearch()
    {
        this.isMobileSearchActive = false;
        //ToDo: Fill Function
    }

}