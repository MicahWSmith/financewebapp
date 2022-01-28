import { Component, OnInit } from '@angular/core';
import { CdServiceService } from '../cd-service.service';
import { Cd } from '../cd/cd.model';
import { Elcd } from '../cd/elcd.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PortfolioApiService } from '../portfolio-api.service';

@Component({
  selector: 'app-cds',
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.scss']
})
export class CdsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private cdService: CdServiceService, private router: Router, private portfolioService: PortfolioApiService ) { }

  cds:Cd[] = [];

  alertMessage: string = "";

  ngOnInit(): void {
    this.cdService.getCds().subscribe(payload => {
      this.cds = payload;
    })
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


}
