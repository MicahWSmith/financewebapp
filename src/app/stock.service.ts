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

  getStockPriceHistoryDay(symbol:string){
    return this.httpClient.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=3241e77649a6b0b8c26d6357a72b8f7e`);
  }

  getStockPriceHistoryHourly(symbol:string){
    return this.httpClient.get(`https://financialmodelingprep.com/api/v3/historical-chart/1hour/${symbol}?apikey=3241e77649a6b0b8c26d6357a72b8f7e`);
  }

  getStockPriceHistoryWeek(symbol:string){
    return this.httpClient.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=7&apikey=3241e77649a6b0b8c26d6357a72b8f7e`);
  }
 
  getStockPriceHistoryMonth(symbol:string){
    return this.httpClient.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=25&serietype=line&apikey=3241e77649a6b0b8c26d6357a72b8f7e`);
  }

  getStockPriceHistoryYear(symbol:string){
    return this.httpClient.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=270&serietype=line&apikey=3241e77649a6b0b8c26d6357a72b8f7e`);
  }
}
