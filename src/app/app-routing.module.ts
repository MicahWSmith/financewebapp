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
  { path: "cds", component: LayoutComponent, canActivate : [AuthGuard],
    children: [
      {
        path: '',
        component: CdsComponent,
      }, 
      {
        path: '',
        component: SidebarComponent,
        outlet: 'left-side-bar-router'
      } 
    ]
  },
  { path: "ira", component: LayoutComponent, canActivate : [AuthGuard],
    children: [
      {
        path: '',
        component: IraComponent,
      }, 
      {
        path: '',
        component: SidebarComponent,
        outlet: 'left-side-bar-router'
      } 
    ] 
  },
  { path: "forex", component: LayoutComponent, canActivate : [AuthGuard],
    children: [
      {
        path: '',
        component: ForexMarketComponent,
      }, 
      {
        path: '',
        component: SidebarComponent,
        outlet: 'left-side-bar-router'
      } 
    ]
  },
  { path: "cash", component: LayoutComponent, canActivate : [AuthGuard],
    children: [
      {
        path: '',
        component: CashAccountComponent,
      }, 
      {
        path: '',
        component: SidebarComponent,
        outlet: 'left-side-bar-router'
      } 
    ] 
  },
  { path: "", component: HomeComponent},
  { path: "portfolio", component: LayoutComponent, canActivate : [AuthGuard],
      children: [
        {
          path: '',
          component: PortfolioComponent,
        }, 
        {
          path: '',
          component: SidebarComponent,
          outlet: 'left-side-bar-router'
        } 
      ]
  },
  { path: "mutualfunds", component: LayoutComponent, canActivate : [AuthGuard],
    children: [
      {
        path: '',
        component: MutualfundsComponent,
      }, 
      {
        path: '',
        component: SidebarComponent,
        outlet: 'left-side-bar-router'
      } 
    ]
  },
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