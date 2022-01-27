import { Component, OnInit } from '@angular/core';
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

  displayedColumnsi: string[] = ["name", "quantity", "datePurchased", "originalValue", "currentValue"];

  displayedColumnst: string[] = ["date", "type", "amount"];

  displayedColumnsp: string[] = ["date", "change"];

  constructor(private iraService : IraService) { }

  ngOnInit(): void {
    this.iraService.getTestIRA().subscribe(response => {
      console.log(response);
      this.ira = response;
    })
    this.iraService.getTestIRAFull().subscribe(response => {
      console.log(response);
      this.iraFull = response;
      this.investments = this.iraFull.investments;
      this.iraFull.transactions.sort(function(a : any, b : any){
        return Date.parse(b.date) - Date.parse(a.date);
      });
      this.transactions = this.iraFull.transactions;
      this.iraFull.performances.sort(function(a : any, b : any){
        return Date.parse(b.date) - Date.parse(a.date);
      });
      this.performances = this.iraFull.performances;
    })
  }

}
