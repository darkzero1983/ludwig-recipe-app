import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { RequestOptions} from '@angular/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { Navigation, SearchResult } from '../models';

@Injectable()
export class NavigationService  {
    public isMobileSearchActive: boolean = false;

    constructor(
        private http: HttpClient
    ) {
    }

    public Load(cmsVersion: boolean): Observable<Navigation> {
        var url: string = environment.apiNavigation;
        if (cmsVersion) {
            url = url + '?cmsVersion=true';
        }
        return this.http.get<Navigation>(url);
    }

    public Search(term: string): Observable<SearchResult> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

        return this.http.post<SearchResult>(environment.apiRecipeSearch ,JSON.stringify(term), httpOptions); 
    }
}