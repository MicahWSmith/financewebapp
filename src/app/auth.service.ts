import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
  GET TOKEN TO SEND IN BODY. IF THE USER IS LOGGED IN IT IS STORED IN THE SESSION. 
  
  token = sessionStorage.getItem('user');

  It is recommended to check if it exists first: EX: token = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : "";
*/
export class AuthService {
  // inject dependencies needed for http calls
  constructor(private http: HttpClient) { }

  /*
    /// Will return a token storing the users' ID if valid credentials ///
    return = 
    {
      token: string
    }
    /// required body params ///
    body = {
      email: string,
      password: string
    }
  */
  getToken(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/getToken", body);
  }

  /*
    Will return a token data: 
    return = 
    {
      id: int,
      iat: number,
      exp: number
    }
    /// required body params ///
    body = {
      token: string
    }
    
  */
  getTokenData(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/getTokenData", body);
  }

  /*
    /// returns all data of a user who was issued that token ///
    return = 
    {
      "data": {
        "id": int,
        "first": string,
        "last": string,
        "email": string,
        "security_question": string,
        "security_answer": string,
        "profile": {
            "id": int,
            "ssn": string,
            "account_number": string,
            "routing_number": string,
            "street_address": string,
            "city": string,
            "state": string,
            "userId": int,
            "createdAt": date,
            "updatedAt": date
        }
      }
    }
    /// required body params ///
    body = {
      token: string
    }

  */
  getUserData(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/getUserData", body);
  }

  /*
    Will list token as expired on server side
    /// required body params ///
    body = {
      token: string
    }
  */
  logout(body: {}): void{
    this.http.post("https://vg-db-users.herokuapp.com/auth/logout", body);
    sessionStorage.clear();
  }

}
