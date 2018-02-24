import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsOverviewComponent } from './components/overview/cms.overview.component';
import { CmsRecipeOverviewComponent } from './components/recipe/cms.recipe.overview.component';
import { CmsService } from './services/cms.service';

const routes: Routes = [
  { path: 'Rezepte', component: CmsRecipeOverviewComponent },
  { path: '', component: CmsOverviewComponent }
 ];

@NgModule({
  declarations: [
    CmsOverviewComponent,
    CmsRecipeOverviewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [CmsService]
})
export class CmsModule { }
