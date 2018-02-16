import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountLoginComponent} from './components/login/account.login.component'
import { AccountLogoutComponent} from './components/logout/account.logout.component'
import { MatInputModule, MatIconModule, MatCheckboxModule, MatAutocompleteModule } from '@angular/material';
import { ValidationService } from '../../shared/services/validation.service';

const routes: Routes = [
  { path: 'Einloggen/:returnUrl', component: AccountLoginComponent },
  { path: 'Einloggen', component: AccountLoginComponent },
  { path: 'Ausloggen', component: AccountLogoutComponent }
 ];

@NgModule({
  declarations: [
    AccountLoginComponent,
    AccountLogoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [ValidationService]
})
export class AccountModule { }
