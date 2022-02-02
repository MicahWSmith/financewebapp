import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user.model';
import { DashboardCommunicationService } from '../dashboard-communication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  User!:User;
  firstName:string = "";
  currentPage:string = 'home';
  step:number = 0;
  
  gotUser: boolean = false;

  constructor(private dashboardCommunicationService:DashboardCommunicationService) {
    dashboardCommunicationService.setSidebar(this);
   }

  ngOnInit(): void {

  }

  goTo(view:string){
      this.dashboardCommunicationService.setView(view);
      this.currentPage = view;
  }

  logout(){
    this.dashboardCommunicationService.logout();
  }

  setStep(num:number){
    this.step = num;
  }

  setUser(user: User){
    this.User = user;
    this.firstName = this.User.first;
    this.gotUser = true;
  }

}
