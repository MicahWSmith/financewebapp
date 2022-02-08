import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashAccountService {

  constructor(private http:HttpClient) { }

  getAccountFull(token : any) : Observable<any> {
    return this.http.get("https://bankaccountmicroservice.herokuapp.com/accounts/full/" +token)
  }

  getAccount(token : any) : Observable<any> {
    return this.http.get("https://bankaccountmicroservice.herokuapp.com/accounts/" + token)
  }

  getTransactions(token : any) : Observable<any> {
    return this.http.get("https://bankaccountmicroservice.herokuapp.com/transactions/account/" + token);
  }

  updateAccount(token : any, balance : number) {
    let body = {balance: balance};
    return this.http.put("https://bankaccountmicroservice.herokuapp.com/accounts/" + token, body, {responseType: 'text'});
  }

  addTransaction(id : number, type : string, amount : number){
    let curDate = new Date();
    let body = {
      type: type,
      amount: amount,
      date: curDate,
      accountId: id
    }
    return this.http.post("https://bankaccountmicroservice.herokuapp.com/transactions/", body);
  }
}
