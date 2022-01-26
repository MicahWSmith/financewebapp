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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "myinfo", component: AccountdetailsComponent},
  { path: "about", component: AboutusComponent},
  { path: "recovery", component: RecoveryComponent},
  { path: "", component: HomeComponent},
  { path: "stocks", component: StocksComponent},
  { path: "cds", component: CdsComponent},
  { path: "ira", component: IraComponent},
  { path: "forex", component: ForexMarketComponent},
  { path: "cash", component: CashAccountComponent},
  { path: "", component: HomeComponent},
  { path: "portfolio", component: PortfolioComponent},
  { path: "dashboard", component: DashboardComponent,
      children:[
        { path: '',
          component: DashboardMainComponent
        },
        {
          path: '',
          component: DashboardSidebarComponent,
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