import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "myinfo", component: AccountdetailsComponent},
  { path: "about", component: AboutusComponent},
  { path: "recovery", component: RecoveryComponent},
  { path: 'mutualfunds', component: MutualfundsComponent},
  { path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
