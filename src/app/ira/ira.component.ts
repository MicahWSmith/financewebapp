import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IraService } from '../ira.service';
import { IRA } from './ira.model';

@Component({
  selector: 'app-ira',
  templateUrl: './ira.component.html',
  styleUrls: ['./ira.component.scss']
})
export class IraComponent implements OnInit {
  ira : IRA = {};
  iraFull : any = {};
  investments : any = [];
  transactions : any = [];
  performances : any = [];
  accountExists: boolean = false;

  displayedColumnsi: string[] = ["name", "quantity", "datePurchased", "originalValue", "currentValue"];

  displayedColumnst: string[] = ["date", "type", "amount"];

  displayedColumnsp: string[] = ["date", "change"];

  constructor(private iraService : IraService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(){
    let token = sessionStorage.getItem('user');
    this.getIRAFull(token);
    /* let body = {
      token: sessionStorage.getItem('user')
    }
    this.authService.getUserData(body).subscribe(res => {
      this.id = res.data.id;
      console.log(this.id);
      this.getIRAFull();
    }); */

  }

  getIRAFull(token: any){
    console.log("getIRAFull called");
    this.iraService.getIRAFull(token).subscribe(response => {
      console.log("response: ", response);
      if (Object.keys(response).length === 0){
        this.accountExists = false;
        return;
      }
      else {
        this.accountExists = true;
        this.iraFull = response;
        this.investments = this.iraFull.investments
        this.iraFull.transactions.sort(function(a : any, b : any){
          return Date.parse(b.date) - Date.parse(a.date);
        });
        this.transactions = this.iraFull.transactions;
        this.iraFull.performances.sort(function(a : any, b : any){
          return Date.parse(b.date) - Date.parse(a.date);
        });
        this.performances = this.iraFull.performances;
      }
    })
  }
}
