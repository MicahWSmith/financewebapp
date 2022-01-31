import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecoveryComponent } from './recovery/recovery.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockGraphComponent } from './stock-graph/stock-graph.component';
import { CdsComponent } from './cds/cds.component';
import { CdComponent } from './cd/cd.component';
import { IraComponent } from './ira/ira.component';
import { ForexMarketComponent } from './forex-market/forex-market.component';
import { CashAccountComponent } from './cash-account/cash-account.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LayoutComponent } from './layout/layout.component'
import { MatExpansionModule } from '@angular/material/expansion';
import { MainComponent } from './dashboard/main/main.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardAccountComponent } from './dashboard/dashboard-account/dashboard-account.component';
import { DashboardMessagesComponent } from './dashboard/dashboard-messages/dashboard-messages.component';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountdetailsComponent,
    RecoveryComponent,
    AboutusComponent,
    HomeComponent,
    StocksComponent,
    StockGraphComponent,
    CdsComponent,
    CdComponent,
    ForexMarketComponent,
    PortfolioComponent,
    IraComponent,
    ForexMarketComponent,
    CashAccountComponent,
    LayoutComponent,
    MainComponent,
    SidebarComponent,
    DashboardHomeComponent,
    DashboardAccountComponent,
    DashboardMessagesComponent,
    MutualfundsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    NgChartsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
