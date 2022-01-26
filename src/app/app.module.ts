import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
import { PortfolioComponent } from './portfolio/portfolio.component'

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
    ForexMarketComponent
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
    MatListModule,
    NgChartsModule,
    MatCardModule,
    MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
