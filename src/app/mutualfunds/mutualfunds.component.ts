import { Component, OnInit } from '@angular/core';
import { MfService } from '../mf.service';


@Component({
  selector: 'app-mutualfunds',
  templateUrl: './mutualfunds.component.html',
  styleUrls: ['./mutualfunds.component.scss']
})
export class MutualfundsComponent implements OnInit {

  constructor(private mfService: MfService) { }
mfs: any;
investments: any;
  ngOnInit(): void {
    this.mfService.getMFs().subscribe(payload => {
      this.mfs = payload;
      console.log('this is payload', payload)
     
      
      
    })
  }

}
