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
    let session = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : "";

    if(session != ""){
      this.loggedIn = true;
    }
  }

  setLoggedOff(){
    this.loggedIn = false;
  }

}
