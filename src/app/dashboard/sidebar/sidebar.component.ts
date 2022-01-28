import { Component, OnInit } from '@angular/core';
import { DashboardCommunicationService } from '../dashboard-communication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  User = {
    fName: 'Dakota',
    lName: 'Korn'
  };
  
  currentPage = 'home';

  constructor(private dashboardService:DashboardCommunicationService) {
    dashboardService.setSidebar(this);
   }

  ngOnInit(): void {
  }

  goTo(view:string){
    if(view != this.currentPage){
      this.dashboardService.setView(view);
      this.currentPage = view;
    }
  }

  logout(){
    console.log('LOGOUT')
  }

}
