import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TransferComponent } from './transfer/transfer.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // Define your routes here, for example:
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'account-form', component: AccountFormComponent },
  { path: 'account-summary', component: AccountSummaryComponent },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'transfer', component: TransferComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
