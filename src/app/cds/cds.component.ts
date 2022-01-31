import { Component, OnInit } from '@angular/core';
import { CdServiceService } from '../cd-service.service';
import { Cd } from '../cd/cd.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PortfolioApiService } from '../portfolio-api.service';

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
    private portfolioService: PortfolioApiService
  ) {}

  cds: Cd[] = [];
  minDeposit: number = 200;
  termLength: number = 12;
  interestRate: number = 2;
  calculatedInterest: any = 0;
  currentValue: number = 0;
  calculatedReturn: number = 0;
  value = 0;
  openingDeposit: number = 0;

  alertMessage: string = '';

  ngOnInit(): void {
    this.cdService.getCds().subscribe((payload) => {
      this.cds = payload;
    });
  }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  buyCd() {
    console.log('congrats');
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  buyCD(index: number) {
    this.alertMessage = "Buying CD..."
    this.portfolioService.buyInvestment(3, {
      type: "cd",
      deposit: this.cds[index].minimumOpeningDeposit,
      interestRate: (this.cds[index].interestRate || 0) / 100,
      term: (this.cds[index].term || 0)* 2592000000
    })
    .subscribe((payload) => {
      console.log("Response: ", payload);
      this.alertMessage = `Invested ${payload.deposit} in a CD.`
    })
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
