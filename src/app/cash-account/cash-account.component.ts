import { Component, OnInit } from '@angular/core';
import { CashAccountService } from '../cash-account.service';

@Component({
  selector: 'app-cash-account',
  templateUrl: './cash-account.component.html',
  styleUrls: ['./cash-account.component.scss']
})
export class CashAccountComponent implements OnInit {
  account : any = {};
  transactions : any = [];

  displayedColumnst: string[] = ["date", "type", "amount"];

  constructor(private cashService: CashAccountService) { }

  ngOnInit(): void {
    this.cashService.getAccountFull(1).subscribe(response => {
      console.log(response);
      this.account = response;
      this.transactions = this.account.transactions;
    })
  }

}
