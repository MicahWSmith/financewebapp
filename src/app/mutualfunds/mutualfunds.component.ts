import { Component, OnInit } from '@angular/core';
import { MfService } from '../mf.service';


export interface MFElement {
  fund_name: string;
  cds: Array<Object>;
  stocks: Array<Object>;
  investAmount: Array<Object>;
  percentage: Array<Object>;
  return: Array<Object>;
}


@Component({
  selector: 'app-mutualfunds',
  templateUrl: './mutualfunds.component.html',
  styleUrls: ['./mutualfunds.component.scss']
})

export class MutualfundsComponent implements OnInit {
  displayedColumns: string[] = ["fund_name", "cds", "stocks", "investAmount", "percentage", "return" ]
  constructor(private mfService: MfService) { }
mfs: any;
investments: any;
  ngOnInit(): void {
    this.mfService.getMFs().subscribe(payload => {
      console.log('this is the payload:',payload)
      for(let i = 0; i< payload.length; i++){
        let amt: any =[]
        let percent: any = []
        let ret: any = []
      
        if(payload[i].Investments.length != 0){
          
          payload[i].Investments.forEach((invest: any) =>{
                 amt.push(invest.investAmount);
                 percent.push(invest.percentage);
                 ret.push(invest.return);               
          })
        
          
        }
        payload[i]["investAmount"] = amt;
        payload[i]["percentage"] = percent;
        payload[i]["return"] = ret;
      }
      
      console.log('this is the new payload:',payload)
      this.mfs = payload;
      

      
    })
  }

}
