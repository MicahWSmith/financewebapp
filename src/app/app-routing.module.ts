import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { IraComponent } from './ira/ira.component';
import { ForexMarketComponent } from "./forex-market/forex-market.component";

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "myinfo", component: AccountdetailsComponent},
  { path: "about", component: AboutusComponent},
  { path: "recovery", component: RecoveryComponent},
  { path: "ira", component: IraComponent},
  { path: "forex", component: ForexMarketComponent},
  { path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }