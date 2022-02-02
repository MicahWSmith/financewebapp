import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StockGraphComponent } from '../stock-graph/stock-graph.component';
import { StockService } from '../stock.service';
import { PortfolioApiService } from '../portfolio-api.service';
import { CashAccountService } from '../cash-account.service';
import { Stock } from './stocks.model'


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
 
  @ViewChild('cmp') child:StockGraphComponent = new StockGraphComponent;
  //@ViewChild('cmp2') child2:StockGraphComponent = new StockGraphComponent;
  stocks = new Array()
  stocksShown = new Array()

  selectedStock: Stock ={
    stock_symbol: '',
    stock_name: '',
    stock_value: {},
    stock_exchange: '',
    stock_industry: '',
    stock_sector: '',
    stock_description: '',
    stock_archives: []
  }

  selectedStockHistoryByDay = new Array();
  selectedStockHistoryByHour = new Array();
  selectedStockValue: number = 0;
  selectedStockChange: number = 0;
  selectedStockPercentChange: number = 0;
  selectedStockChangeNegative: boolean = false;
  count:number = 2;
  slide1:boolean = false;
  slide2:boolean = true;
  slide3:boolean = false;

  view:string = 'week';
  lastValue:string = '';

  currentUser: number = 1;

  rateControl = new FormControl("", [Validators.min(1)]);
  amount:number = 0;
  cost:number = 0;
  cashAvailable:number = 1000000;
  purchaseMessage: string = "";
  canBuy: boolean = true;

  constructor(private stockService: StockService, private portfolioService: PortfolioApiService, private cashService: CashAccountService) { }

  ngOnInit(): void {
    this.stockService.getStockInformation().subscribe((data)=>{
      this.stocks = Object.values(data);
      this.stocksShown = this.stocks;
      this.selectedStock=this.stocks[0];
      this.selectedStockValue = (Object.values(this.selectedStock.stock_value)[0])
      this.stockSelection(this.selectedStock);
    });
    this.getBalance();
  }



  stockSelection(stock:Stock){

    this.selectedStock = stock;
    this.selectedStockValue = Object.values(this.selectedStock.stock_value)[0];
    this.getPriceChange();

    if(this.view == 'day'){
      this.stockService.getStockPriceHistoryHourly(this.selectedStock.stock_symbol).subscribe((data)=>{
          this.selectedStockHistoryByHour = Object.values(data);
             this.stockService.getStockPriceHistoryDay(this.selectedStock.stock_symbol).subscribe((data2)=>{
                let open = Object.values(data2)[0].open;
                this.child.updateHistory(this.selectedStockHistoryByHour,this.selectedStock.stock_name, 'day', open);
             })
          
      });
    }

    if(this.view == 'week'){
         this.stockService.getStockPriceHistoryWeek(this.selectedStock.stock_symbol).subscribe((data)=>{
             this.selectedStockHistoryByDay = Object.values(data)[1];
             this.child.updateHistory(this.selectedStockHistoryByDay,this.selectedStock.stock_name, 'week', this.selectedStockValue);
         });
    }

    if(this.view == 'month'){
      this.stockService.getStockPriceHistoryMonth(this.selectedStock.stock_symbol).subscribe((data)=>{
          this.selectedStockHistoryByDay = Object.values(data)[1];
          this.child.updateHistory(this.selectedStockHistoryByDay,this.selectedStock.stock_name, 'month', this.selectedStockValue);
      });
 }

 if(this.view == 'year'){
  this.stockService.getStockPriceHistoryYear(this.selectedStock.stock_symbol).subscribe((data)=>{

      this.selectedStockHistoryByDay = Object.values(data)[1];
      this.child.updateHistory(this.selectedStockHistoryByDay,this.selectedStock.stock_name, 'year', this.selectedStockValue);

  });
}
  }


  getPriceChange(){

    this.stockService.getStockPriceHistoryDay(this.selectedStock.stock_symbol).subscribe((data)=>{
      let open = Object.values(data)[0].open;

      this.selectedStockChange = (this.selectedStockValue - open);
      this.selectedStockPercentChange = (this.selectedStockChange / open);

      if(this.selectedStockChange < 0){
        this.selectedStockChangeNegative = true;
      }
      else{
        this.selectedStockChangeNegative = false;
      }
    })
    
  }


  changeSlide(direction:string){
    if(direction == 'left' && this.count != 1){
      this.count--;
    }
    if(direction == 'right' && this.count != 3){
      this.count++;
    }

    if(this.count == 1){
      this.slide1 = true;
      this.slide2 = false;
      this.slide3 = false;
    }

    if(this.count == 2){
      this.slide1 = false;
      this.slide2 = true;
      this.slide3 = false;
    }

    if(this.count == 3){
      this.slide1 = false;
      this.slide2 = false;
      this.slide3 = true;
    }
  }

  
  searchStocks(event:any){
    let value = event.target.value;

    let stocksBeingShown = this.stocksShown;
    let newStocks = new Array();

    if(value.length < this.lastValue.length){
      stocksBeingShown = this.stocks;
    }

      for(let stock of stocksBeingShown){
        if(stock.stock_symbol.toUpperCase().includes(value.toUpperCase()) || stock.stock_name.toUpperCase().includes(value.toUpperCase())){
          newStocks.push(stock);
        }
      }
  
    this.lastValue = value;
    this.stocksShown = newStocks;
  }

  async changeView(view:string){
    await (this.view = view);
    this.stockSelection(this.selectedStock);
  }

  getCost(){
    this.cost = this.amount* this.selectedStockValue;
  }

  getBalance() {
    this.cashService.getAccount(this.currentUser)
    .subscribe((payload) => {
      this.cashAvailable = payload.balance;
    })
  }

  buyStock(){
    console.log("Buying: ", this.selectedStock.stock_symbol);
    console.log("Quantity: ", this.amount);

    if(this.amount >= 1)
    {
      this.purchaseMessage = `Buying ${this.amount} shares of ${this.selectedStock.stock_symbol}...`
      this.canBuy = false;

      this.cashService.getAccount(this.currentUser)
      .subscribe((accountPayload) => {
        console.log("Account: ", accountPayload);
        let price = this.amount * this.selectedStockValue;

        if(accountPayload.balance < price) {
          this.purchaseMessage = "Insufficient Balance"
          this.canBuy = true;
        } else {
          let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
          
          this.cashService.updateAccount(this.currentUser, accountPayload.balance - price)
          .subscribe((paidPayload) => {
            this.cashService.addTransaction(this.currentUser, "Bought Stock", price, date)
            .subscribe((transactionPayload) => {
              this.portfolioService.buyInvestment(this.currentUser, {
                type: "stock",
                symbol: this.selectedStock.stock_symbol,
                quantity: this.amount
              })
              .subscribe((payload) => {
                console.log("Response: ", payload);
                this.canBuy = true;
                this.purchaseMessage = `Purchased ${payload.quantity} shares of ${payload.symbol} for \$${payload.purchasePrice * payload.quantity}!`
              })
            })
          })
        }
      })
    }
  }

  setCount(num:number){
    this.count = num;
    this.changeSlide('');
  }

}
