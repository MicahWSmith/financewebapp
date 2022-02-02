import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
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
  step = 0;

  constructor(private dashboardService:DashboardCommunicationService) {
    dashboardService.setSidebar(this);
   }

  ngOnInit(): void {
  }

  goTo(view:string){
      this.dashboardService.setView(view);
      this.currentPage = view;
  }

  logout(){
    this.dashboardService.getAuthService().logout;
  }

  setStep(num:number){
    this.step = num;
  }

}
