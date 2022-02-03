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
    this.loggedIn = false;

    let body = {
      token: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : ""
    }

    this.dashboardCommunicationService.authService.getUserData(body).subscribe(res => {
        if(res){
          this.loggedIn = true;
          console.log("there was a response.")
        }
    })
   
  }

  setLoggedOff(){
    this.loggedIn = false;
  }

}
