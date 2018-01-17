import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Navigation, SearchResult } from '../models';

@Injectable()
export class NavigationService  {
    public isMobileSearchActive: boolean = false;

    constructor(
        private http: HttpClient
    ) {
    }

    Load(cmsVersion: boolean): Observable<Navigation> {
        var url: string = '/api/Navigation/Load';
        if (cmsVersion) {
            url = url + '?cmsVersion=true';
        }
        url = "/test_data/navigation.json"
        return this.http.get<Navigation>(url);
    }

    Search(term: string): Observable<SearchResult> {
        let myData = JSON.stringify(term);

        return this.http.post<SearchResult>('https://www.ludwigs-rezepte.de/api/Recipe/Search', myData);
    }

}