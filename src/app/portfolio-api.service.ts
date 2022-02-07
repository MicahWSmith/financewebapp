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
    let token = sessionStorage.getItem('user');
    return this.http.get<any>(this.portfolioURL + this.portfolioEXT + token)
  }

  buyInvestment(user: number, investment: object) {
    let token = sessionStorage.getItem('user');
    return this.http.post<any>(this.portfolioURL + this.positionEXT + token, investment)
  }

  sellInvestment(user: number, investmentId: number, type: string) {
    let token = sessionStorage.getItem('user');
    let params = new HttpParams();
    params = params.append('id', investmentId);
    params = params.append('type', type);

    return this.http.delete<any>(this.portfolioURL + this.positionEXT + token, {params: params})
  }

}
