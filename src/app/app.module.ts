import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared_component';

import { RecipeModule } from './modules/recipe/recipe.module';

import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountService, NavigationService } from './shared_services';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export function loadRecipeModule() {
  return RecipeModule;
}

const routes: Routes = [
  {
    path: '', loadChildren: loadRecipeModule, canActivate: [AccountService],
    //path: 'CMS'
    //path: 'Benutzerverwaltung'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule,RouterModule],
  providers: [AccountService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
