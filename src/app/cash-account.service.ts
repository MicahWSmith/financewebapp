import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashAccountService {

  constructor(private http:HttpClient) { }

  getAccountFull(id : number) : Observable<any> {
    return this.http.get("https://bankaccountmicroservice.herokuapp.com/accounts/full/" + id)
  }

  updateAccount(id : number, balance : number) {
    let body = {balance: 9999};
    return this.http.put("https://bankaccountmicroservice.herokuapp.com/accounts/" + id, body, {responseType: 'text'});
  }
}
