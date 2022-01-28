import { Injectable } from '@angular/core';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardSideBar: DashboardSidebarComponent = new DashboardSidebarComponent(this);
  dashboardMain: DashboardMainComponent = new DashboardMainComponent(this);

  constructor() { }

  setSidebar(component:DashboardSidebarComponent){
    this.dashboardSideBar = component;
  }

  setMain(component:DashboardMainComponent){
    this.dashboardMain = component;
  }

  setView(view:string){
    this.dashboardMain.setView(view);
  }
}
