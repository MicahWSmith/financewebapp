import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const stockInformationUrl = 'https://boiling-falls-79972.herokuapp.com/info';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }


  getStockInformation() {
    return this.httpClient.get(stockInformationUrl);
  }

  getStockInformationOf(symbol:string) {
    return this.httpClient.get(stockInformationUrl + `/${symbol}`);
  }

  getStockPriceHistory(symbol:string){
    return this.httpClient.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=30&apikey=3241e77649a6b0b8c26d6357a72b8f7e`);
  }
  

}
