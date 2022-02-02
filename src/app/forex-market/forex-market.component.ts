import { Component, OnInit } from '@angular/core';
import { ForexAPIService } from '../forex-api.service';
import { PortfolioApiService } from '../portfolio-api.service';
import { CashAccountService } from '../cash-account.service';
import { Router } from '@angular/router';

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
  canBuy: boolean = true;
  loading: boolean = true;

  displayedColumns: string[] = ["code", "name", "symbol", "price", "quantity", "buy"]

  constructor(private router: Router, private forexService: ForexAPIService, private portfolioService: PortfolioApiService, private cashService: CashAccountService) { }

  ngOnInit(): void {
    this.loading = true;
    this.forexService.getAllCurrencies()
    .subscribe(payload => {
      this.currencies = payload
      this.currencies.map(() => {
        this.quantities.push("0");
      })
      this.loading = false;
    });
  }

  buy(index: number) {
    console.log("Buying: ", this.currencies[index].code);
    console.log("Quantity: ", this.quantities[index]);
    if(this.quantities[index]!=="0") {
      this.alertMessage = `Purchasing ${this.currencies[index].symbol}${this.quantities[index]}...`

      this.canBuy = false;
      this.cashService.getAccount(this.currentUser)
      .subscribe((accountPayload) =>{
        console.log("Account: ", accountPayload)
        let price = Number(this.quantities[index]) * this.currencies[index].lastPrice;

        if(accountPayload.balance < price) {
          this.alertMessage = "Insufficient Balance"
          this.canBuy = true;
        } else {
          let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})

          this.cashService.updateAccount(this.currentUser, accountPayload.balance - price)
          .subscribe((paidPayload) => {
            this.cashService.addTransaction(this.currentUser, "Bought Currency", price, date)
            .subscribe((transactionPayload) => {
              this.portfolioService.buyInvestment(this.currentUser, {
                type: "currency",
                code: this.currencies[index].code,
                quantity: this.quantities[index]
              })
              .subscribe((payload) => {
                console.log("Response: ", payload);
                this.alertMessage = `Purchased ${payload.quantity} ${payload.code} for \$${payload.purchasePrice * payload.quantity}!`
                this.canBuy = true;
              })
              this.clear(index);
            })
          })
        }
      })
  }
}

  clear(index: number) {
    this.quantities[index] = "0"
  }

  updateUser() {
    this.currentUser = this.newUser;
  }

}
