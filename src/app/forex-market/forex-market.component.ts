import { Component, OnInit } from '@angular/core';
import { ForexAPIService } from '../forex-api.service';
import { PortfolioApiService } from '../portfolio-api.service';
import { CashAccountService } from '../cash-account.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forex-market',
  templateUrl: './forex-market.component.html',
  styleUrls: ['./forex-market.component.scss']
})
export class ForexMarketComponent implements OnInit {

  currencies: any[] = [];
  quantities: string[] = [];

  currentUser: number = 5;

  alertMessage: string = "";
  canBuy: boolean = true;
  loading: boolean = true;

  displayedColumns: string[] = ["code", "name", "symbol", "price", "quantity", "buy"]

  constructor(private forexService: ForexAPIService, private portfolioService: PortfolioApiService, private cashService: CashAccountService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.forexService.getAllCurrencies()
    .subscribe(payload => {
      this.currencies = payload
      this.currencies.map(() => {
        this.quantities.push("0");
      })
      let body = {
        token: sessionStorage.getItem('user')
      }
      this.authService.getUserData(body).subscribe(res => {
        this.currentUser = Number(res.data.id);
        this.loading = false;
      });
      
    });
  }

  buy(index: number) {
    console.log("Buying: ", this.currencies[index].code);
    console.log("Quantity: ", this.quantities[index]);
    
    if(this.quantities[index]!=="0") {
      this.alertMessage = `Purchasing ${this.currencies[index].symbol}${this.quantities[index]}...`

      this.canBuy = false;
      let token = sessionStorage.getItem('user');

      this.cashService.getAccount(token)
      .subscribe((accountPayload) =>{
        console.log("Account: ", accountPayload)
        let price = Number(this.quantities[index]) * this.currencies[index].lastPrice;

        if(accountPayload.balance < price) {
          this.alertMessage = "Insufficient Balance"
          this.canBuy = true;
        } else {

          this.cashService.updateAccount(token, accountPayload.balance - price)
          .subscribe((paidPayload) => {
            this.cashService.addTransaction(accountPayload.id, "Bought Currency", price)
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

}
