import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared_component';

import { RecipeModule } from './modules/recipe/recipe.module';

import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountService } from './shared_services/account.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function loadRecipeModule() {
  return RecipeModule;
}

const routes: Routes = [
  {
    path: '', loadChildren: loadRecipeModule, canActivate: [AccountService]
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
    HttpClientModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule,RouterModule],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
