import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent, RecipeOverviewComponent } from './components/';

const routes: Routes = [
  {
    path: '',
    component: RecipeOverviewComponent
  },
  {
    path: 'Detail',
    component: RecipeDetailComponent
  } 
 ];

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeOverviewComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [RecipeOverviewComponent]
})
export class RecipeModule { }
