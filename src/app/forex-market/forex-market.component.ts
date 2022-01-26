import { Component, OnInit } from '@angular/core';
import { ForexAPIService } from '../forex-api.service';
import { PortfolioApiService } from '../portfolio-api.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-forex-market',
  templateUrl: './forex-market.component.html',
  styleUrls: ['./forex-market.component.scss']
})
export class ForexMarketComponent implements OnInit {

  currencies: any[] = [];

  quantities: string[] = [];

  currentUser: number = 5;
  newUser: number = 5;

  alertMessage: string = "";

  displayedColumns: string[] = ["code", "name", "symbol", "price", "quantity", "buy"]

  constructor(private router: Router, private forexService: ForexAPIService, private portfolioService: PortfolioApiService) { }

  ngOnInit(): void {
    this.forexService.getAllCurrencies()
    .subscribe(payload => {
      this.currencies = payload
      this.currencies.map(() => {
        this.quantities.push("0");
      })
    });
  }

  buy(index: number) {
    console.log("Buying: ", this.currencies[index].code);
    console.log("Quantity: ", this.quantities[index]);
    if(this.quantities[index]!=="0") {
      this.alertMessage = `Purchasing ${this.currencies[index].symbol}${this.quantities[index]}...`
      this.portfolioService.buyInvestment(this.currentUser, {
        type: "currency",
        code: this.currencies[index].code,
        quantity: this.quantities[index]
      })
      .subscribe((payload) => {
        console.log("Response: ", payload);
        this.alertMessage = `Purchased ${payload.quantity} ${payload.code} for \$${payload.purchasePrice * payload.quantity}!`
      })
      this.clear(index);
  }
}

  clear(index: number) {
    this.quantities[index] = "0"
  }

  updateUser() {
    this.currentUser = this.newUser;
  }

}
