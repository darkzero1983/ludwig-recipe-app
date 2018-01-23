import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLoginComponent} from './components/login/account.login.component'

const routes: Routes = [
  { path: 'Einloggen', component: AccountLoginComponent },
  { path: '', component: AccountLoginComponent }
 ];

@NgModule({
  declarations: [
    AccountLoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: []
})
export class AccountModule { }
