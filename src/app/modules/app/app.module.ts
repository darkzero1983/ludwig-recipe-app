import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { NavigationComponent } from '../../shared/components';

import { AccountModule, CMSModule, RecipeModule } from '../';

import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountService, NavigationService } from '../../shared/services';
import { RecipeService } from '../../modules/recipe/services/recipe.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../../environments/environment';

export function loadAccountModule() {
  return AccountModule;
}
export function loadCMSModule() {
  return CMSModule;
}
export function loadRecipeModule() {
  return RecipeModule;
}


const routes: Routes = [
  {
    path: 'CMS', loadChildren: loadCMSModule, canActivate: [AccountService]
  },
  {
    path: 'Benutzerverwaltung', loadChildren: loadAccountModule
  },
  {
    path: '', loadChildren: loadRecipeModule
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.useServiceWorker}),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule,RouterModule],
  providers: [AccountService, NavigationService, RecipeService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
