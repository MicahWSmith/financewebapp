import { Component, Input, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { StockHistory } from './stock-history.model';

@Component({
  selector: 'stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent implements OnInit {
  chart: Chart | undefined;
  stockLabels: any = [];
  stockData: any = [];

  ngOnInit(){
    this.chart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['July', 'August', 'September', 'October', 'November', 'December', 'January'],
        datasets: [{
          label: 'stocks for Apple 2021-2022',
          data: [145.4,145.52,152.51,142.65,148.96,164.77,177.57],
          borderWidth: 3,
          fill: false,
          backgroundColor: 'rgba(93, 175, 89, 0.1)',
          borderColor: '#4ACD40',
          tension: .7
        }]
      }
    })
  }


    updateHistory(history:Array<StockHistory>, name:string){
      
      this.chart?.destroy();

      this.stockLabels = [];
      this.stockData = [];
      for(let i = 7; i >= 0; i--){
        let date = new Date(history[i].label)
        let dateString = "" + date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
        this.stockLabels.push(dateString);
        this.stockData.push(history[i].close);
      }

      this.chart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: this.stockLabels,
          datasets: [{
            label: `stocks for ${name} 2021-2022`,
            data: this.stockData,
            borderWidth: 3,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderColor: '#4ACD40',
            tension: .7
          }]
        }
      })
      

    }
}
