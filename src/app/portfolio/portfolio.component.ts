import { Component, OnInit } from '@angular/core';
import { PortfolioApiService } from '../portfolio-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  stocks: any[] = [];
  currencies: any[] = [];

  stockColumns: string[] = ["symbol", "name", "quantity", "purchasePrice", "currentPrice", "sell"]
  currencyColumns: string[] = ["code", "name", "symbol", "quantity", "purchasePrice", "currentPrice", "sell"]

  constructor(private router: Router, private portfolioService: PortfolioApiService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolio(17)
    .subscribe(payload => {
      this.currencies = payload.currencies
      this.stocks = payload.stocks
      console.log("Currencies from API: ", this.currencies)
      console.log("Stocks from API: ", this.stocks)
    });
  }

  sell(index: number) {
    console.log("Selling currency row: ", index)
  }

}
