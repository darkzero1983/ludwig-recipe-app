import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsOverviewComponent } from './components';

const routes: Routes = [
  { path: '', component: CmsOverviewComponent }
 ];

@NgModule({
  declarations: [
    CmsOverviewComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class CmsModule { }
