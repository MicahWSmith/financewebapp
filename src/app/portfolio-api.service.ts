import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService {

  portfolioURL: string = "https://tp-portfolio-server.herokuapp.com/";
  portfolioEXT: string = "portfolio/"
  positionEXT: string = "positions/"

  constructor(private http: HttpClient) { }

  //Returns user's full portfolio
  getPortfolio(user: number): Observable<any> {
    return this.http.get<any>(this.portfolioURL + this.portfolioEXT + user)
  }

  buyInvestment(user: number, investment: object) {
    return this.http.post<any>(this.portfolioURL + this.positionEXT + user, investment)
  }

  sellInvestment(user: number, investmentId: number, type: string) {
    console.log("Investment ID: ", investmentId)
    let params = new HttpParams();
    params = params.append('id', investmentId);
    params = params.append('type', type);

    return this.http.delete<any>(this.portfolioURL + this.positionEXT + user, {params: params})
  }

}
