import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DashboardCommunicationService } from '../dashboard/dashboard-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private dashboardCommunicationService: DashboardCommunicationService) { 
    dashboardCommunicationService.setLandingPage(this);
  }

  ngOnInit(): void {

    if(sessionStorage.getItem('loggedIn') == 'true'){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
   
  }

  setLoggedOff(){
    this.loggedIn = false;
  }

  setLoggedOn(){
    this.loggedIn = true;
  }

}
