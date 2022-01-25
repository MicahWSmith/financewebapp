import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent implements OnInit {

  chart: any = [];
  notherchart: any = [];
  ngOnInit(){
  
    this.chart= new Chart('lineChart', {
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
  
    this.notherchart= new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['July', 'August', 'September', 'October', 'November', 'December', 'January'],
        datasets: [{
          label: 'stocks for Apple 2021-2022',
          data: [145.4,145.52,152.51,142.65,148.96,164.77,177.57],
          borderWidth: 3,
          backgroundColor: ['rgba(176, 125, 90, 0.74)','rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)','rgba(90, 150, 176, 0.74)', 'rgba(143, 90, 176, 0.74)', 'rgba(27, 106, 97, 1)' ],
          hoverOffset: 4
        }]
      }
    })
  }

}
