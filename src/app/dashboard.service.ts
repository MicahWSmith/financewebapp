import { Injectable } from '@angular/core';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardSideBar: DashboardSidebarComponent = new DashboardSidebarComponent();
  dashboardMain: DashboardMainComponent = new DashboardMainComponent();

  constructor() { }

  setSidebar(component:DashboardSidebarComponent){
    this.dashboardSideBar = component;
  }

  setMain(component:DashboardMainComponent){
    this.dashboardMain = component;
  }
}
