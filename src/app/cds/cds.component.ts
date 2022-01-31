import { Component, OnInit } from '@angular/core';
import { CdServiceService } from '../cd-service.service';
import { Cd } from '../cd/cd.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-cds',
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.scss'],
})
export class CdsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cdService: CdServiceService,
    private router: Router
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

  ngOnInit(): void {
    this.cdService.getCds().subscribe((payload) => {
      this.cds = payload;
    });
  }

  displayStyle = 'none';
  
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  buyCd(){
    console.log("congrats")
  }


  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
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
