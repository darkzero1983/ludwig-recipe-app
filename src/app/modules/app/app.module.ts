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
import { NavigationComponent } from '../../shared/components';

//Services
import { NavigationService, TranslationService } from '../../shared/services';
import { AccountService } from '../../shared/authentification/account.service';
import { AccountLoginInformation } from '../../shared/authentification/account.login.information';

//Environment
import { environment } from '../../../environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../shared/authentification/token.interceptor';
import { LoginRedirectInterceptor } from '../../shared/authentification/login.redirct.interceptor';

const routes: Routes = [
  {
    path: 'CMS', loadChildren: '../cms/cms.module#CmsModule', canActivate: [AccountLoginInformation]
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
  providers: [
    AccountService, 
    NavigationService, 
    TranslationService, 
    AccountLoginInformation,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: LoginRedirectInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
