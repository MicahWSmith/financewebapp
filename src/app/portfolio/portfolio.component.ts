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
  cds: any[] = [];

  newUser: number = 1;
  currentUser: number = 1;

  loading: boolean = true;
  currencyMessage: string = "";
  stockMessage: string = "";
  cdMessage: string = "";

  stockColumns: string[] = ["symbol", "name", "quantity", "purchasePrice", "currentPrice", "sell"]
  currencyColumns: string[] = ["code", "name", "symbol", "quantity", "purchasePrice", "currentPrice", "sell"]
  cdColumns: string[] = ["deposit", "interestRate", "openDate", "term", "currentValue", "maturityDate", "sell"]

  constructor(private portfolioService: PortfolioApiService) { }

  ngOnInit(): void {
    this.updatePortfolio();
  }

  parseInt(str: string) {
    return parseInt(str);
  }

  sellCurrency(index: number) {
    console.log("Selling currency: ", this.currencies[index])
    this.currencyMessage = `Selling ${this.currencies[index].quantity} ${this.currencies[index].code} at ${this.currencies[index].currentPrice}`
    this.portfolioService.sellInvestment(this.currentUser,this.currencies[index].investmentID, "currency")
    .subscribe(() => {
      this.currencyMessage = `Sold successfully!`
      this.updatePortfolio();
    })
  }

  sellStock(index: number) {
    console.log("Selling stock row: ", index)
    this.stockMessage = `Selling ${this.stocks[index].quantity} ${this.stocks[index].symbol} at ${this.stocks[index].currentPrice}`
    this.portfolioService.sellInvestment(this.currentUser,this.stocks[index].investmentID, "stock")
    .subscribe(() => {
      this.stockMessage = `Sold successfully!`
      this.updatePortfolio();
    })
  }

  sellCD(index: number) {
    let confirmed = confirm("CDs typically cannot be sold before their maturity date without a penalty. This app does not simulate that penalty. Are you sure you want to proceed?");
    if(!confirmed) {
      return;
    }
    console.log("CD to sell: ", this.cds[index])
    console.log("Selling cd row: ", index)
    this.cdMessage = `Selling for ${this.cds[index].currentValue}`
    this.portfolioService.sellInvestment(this.currentUser,this.cds[index].investmentId, "cd")
    .subscribe(() => {
      this.cdMessage = `Sold successfully!`
      this.updatePortfolio();
    })
  }

  updatePortfolio() {
    this.loading = true;
    this.portfolioService.getPortfolio(this.currentUser)
    .subscribe(payload => {
      this.currencies = payload.currencies
      this.stocks = payload.stocks
      this.cds = payload.cds
      console.log("Currencies from API: ", this.currencies)
      console.log("Stocks from API: ", this.stocks)
      console.log("CDs from API: ", this.cds)
      this.loading = false;
    });
  }

  updateUser() {
    this.currentUser = this.newUser;
    console.log("Updating profile info for: ", this.newUser)
    this.updatePortfolio();
  }

}
