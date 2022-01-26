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

  getAccount(id : number) : Observable<any> {
    return this.http.get("https://bankaccountmicroservice.herokuapp.com/accounts/" + id)
  }

  getTransactions(id : number) : Observable<any> {
    return this.http.get("https://bankaccountmicroservice.herokuapp.com/transactions/account/" + id);
  }

  updateAccount(id : number, balance : number) {
    let body = {balance: balance};
    return this.http.put("https://bankaccountmicroservice.herokuapp.com/accounts/" + id, body, {responseType: 'text'});
  }


  addTransaction(id : number, type : string, amount : number, date : string){
    let body = {
      type: type,
      amount: amount,
      date: date,
      accountId: id
    }
    return this.http.post("https://bankaccountmicroservice.herokuapp.com/transactions/", body);
  }

}
