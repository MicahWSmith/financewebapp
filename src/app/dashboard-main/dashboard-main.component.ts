import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  //dashboardService: DashboardService = new DashboardService();
  view = 'home';

  constructor() {
    //this.dashboardService.setMain(this);
   }

  ngOnInit(): void {
  }

  setView(view:string){
    this.view = view;
  }

}
