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
      console.log(response);
      this.account = response;
      this.transactions = this.account.transactions;
    })
  }

  getAccount(){
    this.cashService.getAccount(this.account.id).subscribe(response => {
      this.account = response;
    })
  }

  getTranscations() {
    this.cashService.getTransactions(this.account.id).subscribe(response => {
      this.transactions = response;
    })
  }
  
  transfer() {
    let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
    this.cashService.addTransaction(this.account.id, this.selected, this.amount, date).subscribe(response => {
      this.getTranscations;
      if (this.selected == "Withdrawal"){
        let balance = this.account.balance - this.amount;
        this.cashService.updateAccount(this.account.id, balance).subscribe(reponse => {
          this.getAccount;
        });
      }
      else if (this.selected == "Deposit"){
        let balance = this.account.balance + this.amount;
        this.cashService.updateAccount(this.account.id, balance).subscribe(response => {
          this.getAccount;
        });
      }
    });
  }

}
