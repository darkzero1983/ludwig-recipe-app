import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent, RecipeOverviewComponent } from './components/';
import { RecipeService } from './services/recipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DivisionPipe } from './pipes/division.pipe';
import { MultiplicationPipe } from './pipes/multiplication.pipe';
import { NumberFormatPipe } from './pipes/number.format.pipe';
import { NoSanitizePipe } from './pipes/no.sanitize.pipe';

const routes: Routes = [
  { path: '', component: RecipeOverviewComponent },
  { path: 'Rezepte/:categoryUrl', component: RecipeOverviewComponent },
  { path: 'Rezepte/:categoryUrl/:subCategoryUrl', component: RecipeOverviewComponent },
  { path: 'Rezept/:url/:id', component: RecipeDetailComponent }
 ];

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeOverviewComponent,
    DivisionPipe,
    MultiplicationPipe,
    NumberFormatPipe,
    NoSanitizePipe
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [RecipeService]
})
export class RecipeModule { }
