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
  detailButton : string = "Show Account Details"
  displayDetails : boolean = false;
  displayForm : boolean = false;
  selected : string = "";
  amount : number = 0;
  balance : number = 0;

  displayedColumnst: string[] = ["date", "type", "amount"];

  constructor(private cashService: CashAccountService) { }

  ngOnInit(): void {
    this.updateAll();
  }

  showDetails() {
    if (this.detailButton == "Show Account Details"){
      this.detailButton = "Hide Account Details";
      if (this.displayForm){
        this.showForm();
      }
    }
    else {
      this.detailButton = "Show Account Details";
    }
    this.displayDetails = !this.displayDetails;
  }

  showForm() {
    if (!this.displayForm && this.displayDetails){
      this.showDetails();
    }
    this.displayForm = !this.displayForm;
  }

  updateAll(){
    this.cashService.getAccountFull(1).subscribe(response => {
      this.account = response;
      this.account.transactions.sort(function(a : any, b : any){
        return Date.parse(b.date) - Date.parse(a.date);
      })
      this.transactions = this.account.transactions;
    })
  }
  
  transfer() {
    let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
    this.cashService.addTransaction(this.account.id, this.selected, this.amount, date).subscribe(response => {
      if (this.selected == "Withdrawal"){
        let balance = this.account.balance - this.amount;
        this.cashService.updateAccount(this.account.id, balance).subscribe(reponse => {
          this.ngOnInit();
        });
      }
      else if (this.selected == "Deposit"){
        let balance : number = Number(this.account.balance) + Number(this.amount);
        this.cashService.updateAccount(this.account.id, balance).subscribe(response => {
          this.ngOnInit();
        });
      }
    });
  }

}
