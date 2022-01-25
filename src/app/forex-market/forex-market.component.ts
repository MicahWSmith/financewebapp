import { Component, OnInit } from '@angular/core';
import { ForexAPIService } from '../forex-api.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-forex-market',
  templateUrl: './forex-market.component.html',
  styleUrls: ['./forex-market.component.scss']
})
export class ForexMarketComponent implements OnInit {

  currencies: any[] = [];

  quantities: string[] = [];

  displayedColumns: string[] = ["code", "name", "symbol", "price", "quantity", "buy"]

  constructor(private router: Router, private forexService: ForexAPIService) { }

  ngOnInit(): void {
    this.forexService.getAllCurrencies()
      .subscribe(payload => {
        this.currencies = payload
        this.currencies.map(() => {
          this.quantities.push("0");
        })
      });
  }

  buy(index: number) {
    console.log("Buying: ", this.currencies[index].code);
    console.log("Quantity: ", this.quantities[index]);
    this.clear(index);
  }

  clear(index: number) {
    this.quantities[index] = "0"
  }

}
