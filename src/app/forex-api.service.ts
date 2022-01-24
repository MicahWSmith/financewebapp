import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForexAPIService {

  forexURL: string = "https://forex-server.herokuapp.com/currency/";

  constructor(private http: HttpClient) { }

  //Returns array of all currencies
  getAllCurrencies(): Observable<any> {
    return this.http.get<any>(this.forexURL)
  }
  //Returns single currency object
  getOneCurrency(code: string): Observable<any> {
    return this.http.get<any>(this.forexURL + code)
  }
}
