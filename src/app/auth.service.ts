import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/getToken", body);
  }

  getTokenData(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/getTokenData", body);
  }

  getUserData(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/getUserData", body);
  }

  logout(body: {}): void{
    //return this.http.post("https://vg-db-users.herokuapp.com/auth/getUserData", body);
    sessionStorage.clear();
  }

}
