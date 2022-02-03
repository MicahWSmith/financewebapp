import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StockHistory } from './stock-history.model';

@Component({
  selector: 'stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent implements OnInit {
  chart!: Chart;
  stockLabels: any = [];
  stockData: any = [];
  label: string = '';
  
  ngOnInit(){
    
  }


    updateHistory(history:Array<StockHistory>, name:string, view:string, open?:number){
      
      this.chart?.destroy();
      this.stockLabels = [];
      this.stockData = [];

      if(view == 'day'){
        this.stockLabels.push('10AM');
        this.stockData.push(open);

        let today = (new Date);

        for(let i = 5; i >= 0; i--){
          let date = new Date(history[i].date)
          if(date.getDate() == today.getDate()){
            let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            let am_pm = date.getHours() >= 12 ? "PM" : "AM";
            let time = hour + " " + am_pm;
            
            if(hour != 10){
              this.stockLabels.push(time);
              this.stockData.push(history[i].close);
            }

          }
        }

        if(this.stockData.length == 0){
          for(let i = 10; i >= 0; i--){
            let date = new Date(history[i].date)
            if(date.getDate() == today.getDate() - 1){
              let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
              let am_pm = date.getHours() >= 12 ? "PM" : "AM";
              let time = hour + " " + am_pm;
              this.stockLabels.push(time);
              this.stockData.push(history[i].close);
            }
          }
          today.setDate(today.getDate() - 1)
        }
        
        this.label = `Stock prices for ${today.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })} (EST)`;
      }

      if(view == 'week'){
        
        let firstDate:Date = new Date();
        for(let i = history.length - 1; i >= 0; i--){
          let date = new Date(history[i].label)

          if(i == history.length - 1){
            firstDate = date;
          }

          let dateString = "" + date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
          this.stockLabels.push(dateString);
          this.stockData.push(history[i].close);
        }

        let dateString = "" + (new Date()).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
        this.stockLabels.push(dateString);
        this.stockData.push(open);

         this.label = `Stock prices since ${firstDate.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}`;
      }

      if(view == 'month'){
        let firstDate:Date = new Date();

        for(let i = history.length - 1; i >= 0; i--){
          let date = new Date(history[i].date)

          if(i == history.length - 1){
            firstDate = date;
          }

          let dateString = "" + date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
          this.stockLabels.push(dateString);
          this.stockData.push(history[i].close);
        }

        let dateString = "" + (new Date()).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
        this.stockLabels.push(dateString);
        this.stockData.push(open);

        this.label = `Stock prices since ${firstDate.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}`;
      }

      
      if(view == 'year'){

        let firstDate:Date = new Date();

        for(let i = history.length - 1; i >= 0; i--){
          let date = new Date(history[i].date);

          if(i == history.length - 1){
            firstDate = date;
          }

          let dateString = "" + date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
          this.stockLabels.push(dateString);
          this.stockData.push(history[i].close);
        }

        let dateString = "" + (new Date()).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
        this.stockLabels.push(dateString);
        this.stockData.push(open);

        this.label = `Stock prices since ${firstDate.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}`;
      }


      this.createChart(name);
    }


    createChart(name:string){
      this.chart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: this.stockLabels,
          datasets: [{
            label: this.label,
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
