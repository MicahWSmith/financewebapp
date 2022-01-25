import { Component, OnInit, ViewChild } from '@angular/core';
import { StockGraphComponent } from '../stock-graph/stock-graph.component';
import { StockService } from '../stock.service';
import { Stock } from './stocks.model'


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
 
  @ViewChild('cmp') child:StockGraphComponent = new StockGraphComponent;
  stocks = new Array()
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

  selectedStockHistory = new Array();
  selectedStockValue: number = 0;
  selectedStockChange: number = 0;
  selectedStockPercentChange: number = 0;
  selectedStockChangeNegative: boolean = false;
  count:number = 2;
  slide1:boolean = false;
  slide2:boolean = true;
  slide3:boolean = false;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getStockInformation().subscribe((data)=>{
      this.stocks = Object.values(data);
      this.selectedStock=this.stocks[0];
      this.selectedStockValue = (Object.values(this.selectedStock.stock_value)[0])
      this.stockSelection(this.selectedStock);
    });
  }

  stockSelection(stock:Stock){

    this.selectedStock = stock;
    this.selectedStockValue = Object.values(this.selectedStock.stock_value)[0];


    this.stockService.getStockPriceHistory(this.selectedStock.stock_symbol).subscribe((data)=>{
      this.selectedStockHistory = Object.values(data)[1];
      this.selectedStockHistory.unshift({label: new Date, close:this.selectedStockValue});
      this.child.updateHistory(this.selectedStockHistory,this.selectedStock.stock_name);
      //console.log("history on stock component: ", this.selectedStockHistory);
      this.selectedStockChange = (this.selectedStockValue - this.selectedStockHistory[1].close);
      this.selectedStockPercentChange = (this.selectedStockChange / this.selectedStockHistory[1].close);
      if(this.selectedStockChange < 0){
        this.selectedStockChangeNegative = true;
      }
      else{
        this.selectedStockChangeNegative = false;
      }
    });
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
    console.log(event.target.value);
  }

}
