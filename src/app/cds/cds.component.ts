/*
    MARCUS ACCEPT THIS PULL REQUEST IF YOU SEE THIS.
    SEND ME A TEXT MESSAGE: 267-306-7701



*/


import { Component, OnInit } from '@angular/core';
import { CdServiceService } from '../cd-service.service';
import { Cd } from '../cd/cd.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PortfolioApiService } from '../portfolio-api.service';
import { CashAccountService } from '../cash-account.service';
import { DashboardCommunicationService } from '../dashboard/dashboard-communication.service';
import { AuthService } from '../auth.service';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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
    private dashboardCommunicationService: DashboardCommunicationService,
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
  faTimesCircle = faTimesCircle;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.cdService.getCds().subscribe((payload) => {
      this.cds = payload;
      let body = {
        token: sessionStorage.getItem('user')
      }
      this.authService.getUserData(body).subscribe(res => {
        this.currentUser = res.data.id;
        this.loading = false;
      });
    });
  }

  displayStyle = 'none';

  onOpenCd() {
    console.log('opening cd modal');
  }

  hideSidebar(){
    this.dashboardCommunicationService.layoutComponent.hideSidebar();
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
    this.dashboardCommunicationService.layoutComponent.hideSidebar();
  }

  reset(event: any) {
    event.value = '';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.valid = false;
    this.dashboardCommunicationService.layoutComponent.showSidebarToggleButton();
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
      let token = sessionStorage.getItem('user');

      this.cashService.getAccount(token)
      .subscribe((accountPayload) => {
        console.log("Account: ", accountPayload)

        if(accountPayload.balance < this.userDepositInput) {
          this.alertMessage = "Insufficient Balance"
          this.canBuy = true;
        } else {

          this.cashService.updateAccount(token, accountPayload.balance - this.userDepositInput)
          .subscribe((paidPayload) => {
            this.cashService.addTransaction(accountPayload.id, "Bought CD", this.userDepositInput)
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
  buttonCalc(event: any, termLength: any, interestRate: any) {
    console.log('i fired', event.value, termLength.value, interestRate.value )
    this.calculatedReturn =
      event.value * Math.pow(1 + interestRate.value / 365, termLength.value);
  }

  xferData(minDeposit: any, termLength: any, interestRate: any) {
    this.toggleCalc()
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
  moveClass: boolean = false;
  toggleCalc(): void{
    this.dashboardCommunicationService.layoutComponent.showSidebarToggleButton();
    if (this.moveClass == false){
      this.moveClass = true;
     
    } else {
      this.moveClass = false;
     
    }
  }
  
}
