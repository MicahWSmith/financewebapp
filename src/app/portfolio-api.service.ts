import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
