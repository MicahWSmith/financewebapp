import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { StocksComponent } from './stocks/stocks.component';
import { CdsComponent } from './cds/cds.component';
import { ForexMarketComponent } from "./forex-market/forex-market.component";
import { PortfolioComponent } from './portfolio/portfolio.component';
import { IraComponent } from './ira/ira.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { LayoutComponent } from './layout/layout.component';

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
  { path: "portfolio", component: PortfolioComponent},
  { path: "dashboard", component: LayoutComponent,
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