import { Component, HostListener, OnInit } from '@angular/core';
import { PortfolioApiService } from '../portfolio-api.service';
import { CashAccountService } from '../cash-account.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  stocks: any[] = [];
  currencies: any[] = [];
  cds: any[] = [];

  currentUser: number = 1;

  totalValue: number = 0;
  totalPurchaseValue: number = 0;
  totalGain: number = 0;
  percentGain: number = 0;

  loading: boolean = true;
  canSell: boolean = true;
  currencyMessage: string = "";
  stockMessage: string = "";
  cdMessage: string = "";

  stockColumns: string[] = ["symbol", "name", "quantity", "purchasePrice", "lastPrice", "purchaseValue", "currentValue", "sell"]
  currencyColumns: string[] = ["code", "name", "symbol", "quantity", "purchasePrice", "lastPrice", "purchaseValue", "currentValue", "sell"]
  cdColumns: string[] = ["deposit", "interestRate", "openDate", "term", "currentValue", "maturityDate", "sell"]

  sideBarExpanded = true;
  display = true;

  constructor(private portfolioService: PortfolioApiService, private cashService: CashAccountService, private authService: AuthService) { }

  ngOnInit(): void {
    let body = {
      token: sessionStorage.getItem('user')
    }
    this.authService.getUserData(body).subscribe(res => {
      console.log("Logged in as: ", res.data.id)
      console.log("Cast to number: ", Number(res.data.id))
      this.currentUser = res.data.id;
      this.updatePortfolio();
    });
    
  }

  parseInt(str: string) {
    return parseInt(str);
  }

  sellCurrency(index: number) {
    console.log("Selling currency: ", this.currencies[index])
    this.currencyMessage = `Selling ${this.currencies[index].quantity} ${this.currencies[index].code} at ${this.currencies[index].currentPrice}`
    this.canSell = false;
    
    this.cashService.getAccount(this.currentUser)
    .subscribe((accountPayload) => {
      let price = this.currencies[index].quantity * this.currencies[index].currentPrice
      let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})

      this.cashService.updateAccount(accountPayload.id, accountPayload.balance + price)
      .subscribe((soldPayload) => {
        this.cashService.addTransaction(accountPayload.id, "Sold Currency", price, date)
        .subscribe((transactionPayload) => {
          this.portfolioService.sellInvestment(this.currentUser,this.currencies[index].investmentID, "currency")
          .subscribe(() => {
            this.currencyMessage = `Sold successfully!`
            this.canSell = true;
            this.updatePortfolio();
          })
          
        })
      })
    })
  }

  sellStock(index: number) {
    console.log("Selling stock row: ", index)
    this.stockMessage = `Selling ${this.stocks[index].quantity} ${this.stocks[index].symbol} at ${this.stocks[index].currentPrice}`
    this.canSell = false;
    
    this.cashService.getAccount(this.currentUser)
    .subscribe((accountPayload) => {
      let price = this.currencies[index].quantity * this.currencies[index].currentPrice
      let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})

      this.cashService.updateAccount(this.currentUser, accountPayload.balance + price)
      .subscribe((soldPayload) => {
        this.cashService.addTransaction(this.currentUser, "Sold Stock", price, date)
        .subscribe((transactionPayload) => {
          this.portfolioService.sellInvestment(this.currentUser,this.stocks[index].investmentID, "stock")
          .subscribe(() => {
            this.stockMessage = `Sold successfully!`
            this.canSell = true;
            this.updatePortfolio();
          })
        })
      })
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
    this.canSell = false;

    this.cashService.getAccount(this.currentUser)
    .subscribe((accountPayload) => {
      let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})

      this.cashService.updateAccount(this.currentUser, accountPayload.balance + this.cds[index].currentValue)
      .subscribe((soldPayload) => {
        this.cashService.addTransaction(this.currentUser, "Sold CD", this.cds[index].currentValue, date)
        .subscribe((transactionPayload) => {
          this.portfolioService.sellInvestment(this.currentUser,this.cds[index].investmentId, "cd")
          .subscribe(() => {
            this.cdMessage = `Sold successfully!`
            this.canSell = true;
            this.updatePortfolio();
          })
        })
      })
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

      this.totalValue = 0;
      this.totalValue += this.currencies.reduce((prev, curr) => {
        return prev += Number(curr.currentPrice) * Number(curr.quantity);
      }, 0)
      this.totalValue += this.stocks.reduce((prev, curr) => {
        return prev += Number(curr.currentPrice) * Number(curr.quantity);
      }, 0)
      this.totalValue += this.cds.reduce((prev, curr) => {
        return prev += Number(curr.currentValue);
      }, 0)
      console.log("Total Value: ", this.totalValue)

      this.totalPurchaseValue = 0;
      this.totalPurchaseValue += this.currencies.reduce((prev, curr) => {
        return prev += Number(curr.purchasePrice) * Number(curr.quantity);
      }, 0)
      this.totalPurchaseValue += this.stocks.reduce((prev, curr) => {
        return prev += Number(curr.purchasePrice) * Number(curr.quantity);
      }, 0)
      this.totalPurchaseValue += this.cds.reduce((prev, curr) => {
        return prev += Number(curr.deposit);
      }, 0)

      this.totalGain = this.totalValue - this.totalPurchaseValue;
      this.percentGain = this.totalGain / this.totalPurchaseValue

      this.loading = false;
    });
  }

  toggleSideBar(){
    this.sideBarExpanded = !this.sideBarExpanded;
    
    if(this.sideBarExpanded){
      setTimeout(() =>{
        this.display = true;
      },300)
    }
    else{
      setTimeout(() =>{
        this.display = false;
      },300)
    }
  }

  @HostListener('window:resize', ['$event'])
      onResize(event:any) {
        if(event.target.innerWidth > 1800){
          this.sideBarExpanded = true;
          this.display = true;
          
        }
       
}

}
