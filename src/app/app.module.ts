import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RecipeModule } from './modules/recipe/recipe.module';

import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

export function loadRecipeModule() {
  return RecipeModule;
}

const routes: Routes = [
  {
    path: '',
    loadChildren: loadRecipeModule
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule,RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
