import { Component, OnInit } from '@angular/core';
import { CdServiceService } from '../cd-service.service';
import { Cd } from '../cd/cd.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PortfolioApiService } from '../portfolio-api.service';
import { CashAccountService } from '../cash-account.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cds',
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.scss'],
})
export class CdsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cdService: CdServiceService,
    private router: Router,
    private portfolioService: PortfolioApiService,
    private cashService: CashAccountService,
    private authService: AuthService
  ) {}

  cds: Cd[] = [];
  minDeposit: any = 200;
  termLength: number = 12;
  interestRate: number = 2;
  calculatedInterest: any = 0;
  currentValue: number = 0;
  calculatedReturn: number = 0;
  value = 0;
  userDepositInput: any = 0;
  alertMessage: string = '';
  canBuy: boolean = false;
  currentUser: number = 1;
  valid: boolean = false;

  ngOnInit(): void {
    this.cdService.getCds().subscribe((payload) => {
      this.cds = payload;
      let body = {
        token: sessionStorage.getItem('user')
      }
      this.authService.getUserData(body).subscribe(res => {
        this.currentUser = res.data.id;
      });
    });
  }

  displayStyle = 'none';

  onOpenCd() {
    console.log('opening cd modal');
  }

  updateDeposit(event: any) {
    this.userDepositInput = (<HTMLInputElement>event.target).value;
  }

  openPopup(termLength: any, interestRate: any, minDeposit: any) {
    this.displayStyle = 'block';
    this.termLength = termLength;
    this.interestRate = interestRate;
    this.userDepositInput = minDeposit;
    this.minDeposit = minDeposit;
  }

  reset(event: any) {
    event.value = '';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.valid = false;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  buyCD(index: number) {
    let finalValue = 0;

    if (Number(this.userDepositInput) >= this.minDeposit) {
      finalValue = Number(this.userDepositInput);
      this.valid = false;
      this.canBuy = false;
      this.alertMessage = 'Buying CD...';

      this.cashService.getAccount(this.currentUser)
      .subscribe((accountPayload) => {
        console.log("Account: ", accountPayload)

        if(accountPayload.balance < this.userDepositInput) {
          this.alertMessage = "Insufficient Balance"
          this.canBuy = true;
        } else {
          let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})

          this.cashService.updateAccount(accountPayload.id, accountPayload.balance - this.userDepositInput)
          .subscribe((paidPayload) => {
            this.cashService.addTransaction(accountPayload.id, "Bought CD", this.userDepositInput, date)
            .subscribe((transactionPayload) => {
              this.portfolioService.buyInvestment(this.currentUser, {
                type: 'cd',
                deposit: finalValue,
                interestRate: (this.interestRate || 0) / 100,
                term: (this.termLength || 0) * 2592000000,
              })
              .subscribe((payload) => {
                console.log('Response: ', payload);
                this.alertMessage = `Invested ${payload.deposit} in a CD.`;
                this.canBuy = true;
              })
            })
          })
        }
      })
      this.closePopup();

      console.log(
        'user deposit input',
        Number(this.userDepositInput),
        'minDeposit',
        this.minDeposit
      );
    } else {
      console.log("helele")
      this.valid = true;
      return;
    }
  }

  calculateReturn(
    minDeposit: any,
    termLength: any,
    interestRate: any,
    event: any
  ) {
    this.calculatedInterest =
      minDeposit * Math.pow(1 + interestRate / 365, termLength);
    this.calculatedReturn = this.calculatedInterest.toFixed(2);
    this.value = coerceNumberProperty(event);
  }

  sliderCalc(event: any, termLength: any, interestRate: any) {
    this.calculatedReturn =
      event.value * Math.pow(1 + interestRate / 365, termLength);
  }

  xferData(minDeposit: any, termLength: any, interestRate: any) {
    this.minDeposit = minDeposit;
    this.termLength = termLength;
    this.interestRate = interestRate;
    this.calculateReturn(
      this.minDeposit,
      this.termLength,
      this.interestRate,
      event
    );
  }
}
