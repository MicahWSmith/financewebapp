import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { IraComponent } from './ira/ira.component';
import { ForexMarketComponent } from "./forex-market/forex-market.component"
import { CashAccountComponent } from './cash-account/cash-account.component';
import { StocksComponent } from './stocks/stocks.component';
import { CdsComponent } from './cds/cds.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './dashboard/main/main.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "myinfo", component: AccountdetailsComponent, canActivate : [AuthGuard]},
  { path: "about", component: AboutusComponent},
  { path: "recovery", component: RecoveryComponent},
  { path: "", component: HomeComponent},
  { path: "stocks", component: StocksComponent, canActivate : [AuthGuard]},
  { path: "cds", component: CdsComponent, canActivate : [AuthGuard]},
  { path: "ira", component: IraComponent, canActivate : [AuthGuard]},
  { path: "forex", component: ForexMarketComponent, canActivate : [AuthGuard]},
  { path: "cash", component: CashAccountComponent, canActivate : [AuthGuard]},
  { path: "portfolio", component: PortfolioComponent, canActivate : [AuthGuard]},
  { path: "mutualfunds", component: MutualfundsComponent, canActivate : [AuthGuard]},
  { path: "dashboard", component: LayoutComponent, canActivate : [AuthGuard],
      children:[
        { path: '',
          component: MainComponent
        },
        {
          path: '',
          component: SidebarComponent,
          outlet: 'left-side-bar-router'
        } 
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }