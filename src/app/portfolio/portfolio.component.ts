import { Component, OnInit } from '@angular/core';
import { PortfolioApiService } from '../portfolio-api.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  stocks: any[] = [];
  currencies: any[] = [];

  newUser: number = 17;
  currentUser: number = 17;

  loading: boolean = true;

  stockColumns: string[] = ["symbol", "name", "quantity", "purchasePrice", "currentPrice", "sell"]
  currencyColumns: string[] = ["code", "name", "symbol", "quantity", "purchasePrice", "currentPrice", "sell"]

  constructor(private router: Router, private portfolioService: PortfolioApiService) { }

  ngOnInit(): void {
    this.updatePortfolio();
  }

  sell(index: number) {
    console.log("Selling currency row: ", index)
  }

  updatePortfolio() {
    this.loading = true;
    this.portfolioService.getPortfolio(this.currentUser)
    .subscribe(payload => {
      this.currencies = payload.currencies
      this.stocks = payload.stocks
      console.log("Currencies from API: ", this.currencies)
      console.log("Stocks from API: ", this.stocks)
      this.loading = false;
    });
  }

  updateUser() {
    this.currentUser = this.newUser;
    console.log("Updating profile info for: ", this.newUser)
    this.updatePortfolio();
  }

}
