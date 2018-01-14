import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './components/detail/recipe.detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeDetailComponent
  } 
 ];

@NgModule({
  declarations: [
    RecipeDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [RecipeDetailComponent]
})
export class RecipeModule { }
