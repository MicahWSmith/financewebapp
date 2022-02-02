import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardCommunicationService } from './dashboard/dashboard-communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'financewebapp';
  loggedIn: boolean = false;

  constructor(private dashboardCommunicationService:DashboardCommunicationService, private router: Router){
    dashboardCommunicationService.setAppComponent(this);
  }

  setLoggedIn(){
    this.loggedIn = true;
  }

  setLoggedOut(){
    this.loggedIn = false;
  }

  goToMyAccount(){
    this.dashboardCommunicationService.Main.setView('account');
    this.router.navigate(['/dashboard']);
  }
}
