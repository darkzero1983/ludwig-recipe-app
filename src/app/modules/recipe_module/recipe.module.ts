import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RecipeOverviewComponent } from './components/overview/recipe.overview.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [],
  bootstrap: [RecipeOverviewComponent]
})
export class RecipeModule { }
