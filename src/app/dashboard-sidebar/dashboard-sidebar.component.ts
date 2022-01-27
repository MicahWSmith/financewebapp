import { Component, OnInit } from '@angular/core';
import { DashboardMainComponent } from '../dashboard-main/dashboard-main.component';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  //dashboardService: DashboardService = new DashboardService();
  User = {
    fName: 'Dakota',
    lName: 'Korn'
  };
  
  currentPage = 'home';

  constructor() {
    
   }

  ngOnInit(): void {
    //this.dashboardService.setSidebar(this);
  }

  goTo(view:string){
    if(view != this.currentPage){
      //this.dashboardMain.setView(view);
    }
  }

  logout(){
    console.log('LOGOUT')
  }

}
