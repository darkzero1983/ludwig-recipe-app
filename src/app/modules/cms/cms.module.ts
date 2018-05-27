import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsOverviewComponent } from './components/overview/cms.overview.component';
import { CmsRecipeOverviewComponent } from './components/recipe/cms.recipe.overview.component';
import { CmsRecipeEditComponent } from './components/recipe/cms.recipe.edit.component';
import { CmsService } from './services/cms.service';
import { MatInputModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule } from '@angular/material';
import { ValidationService } from '../../shared/services/validation.service';
import { NgUploaderModule } from 'ngx-uploader';
import { OverlayModule } from "@angular/cdk/overlay";

const routes: Routes = [
  { path: 'Rezepte', component: CmsRecipeOverviewComponent },
  { path: 'Rezept/:id', component: CmsRecipeEditComponent },
  { path: '', component: CmsOverviewComponent }
 ];

@NgModule({
  declarations: [
    CmsOverviewComponent,
    CmsRecipeOverviewComponent,
    CmsRecipeEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    NgUploaderModule,
    OverlayModule
  ],
  exports: [RouterModule],
  providers: [CmsService, ValidationService]
})
export class CmsModule { }
