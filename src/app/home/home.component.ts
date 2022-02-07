import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DashboardCommunicationService } from '../dashboard/dashboard-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private dashboardCommunicationService: DashboardCommunicationService, private authService: AuthService) { 
    dashboardCommunicationService.setLandingPage(this);
  }

  ngOnInit(): void {
    this.checkedLoggedIn();
  }

  async checkedLoggedIn(){
    this.loggedIn = await this.authService.loggedIn();
  }

  setLoggedOff(){
    this.loggedIn = false;
  }

  setLoggedOn(){
    this.loggedIn = true;
  }

}
