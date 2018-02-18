import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent, RecipeOverviewComponent } from './components/';
import { RecipeService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: RecipeOverviewComponent },
  { path: 'Rezepte/:categoryUrl', component: RecipeOverviewComponent },
  { path: 'Rezepte/:categoryUrl/:subCategoryUrl', component: RecipeOverviewComponent },
  { path: 'Rezept/:url/:id', component: RecipeDetailComponent } 
 ];

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeOverviewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [RecipeService]
})
export class RecipeModule { }
