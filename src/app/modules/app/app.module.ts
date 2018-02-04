//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//External
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import 'hammerjs';

//Components
import { AppComponent } from './components/app.component';
import { NavigationComponent } from '@shared/components';

//Services
import { AccountService, NavigationService, TranslationService } from '@shared/services';

//Environment
import { environment } from '../../../environments/environment';



const routes: Routes = [
  {
    path: 'CMS', loadChildren: '../cms/cms.module#CmsModule', canActivate: [AccountService]
  },
  {
    path: 'Benutzerverwaltung', loadChildren: '../account/account.module#AccountModule'
  },
  {
    path: '', loadChildren: '../recipe/recipe.module#RecipeModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule,RouterModule],
  providers: [AccountService, NavigationService, TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
