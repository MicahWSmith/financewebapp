import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardCommunicationService } from './dashboard/dashboard-communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'financewebapp';
  loggedIn: boolean = false;

  constructor(private dashboardCommunicationService:DashboardCommunicationService, private router: Router){
    dashboardCommunicationService.setAppComponent(this);
  }

  ngOnInit(): void {
    this.loggedIn = false;

    let body = {
      token: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : ""
    }

    this.dashboardCommunicationService.authService.getUserData(body).subscribe(res => {
      this.loggedIn = true;
    })
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

  goToDashboard(){
    this.dashboardCommunicationService.Main.setView('home');
    this.router.navigate(['/dashboard']);
  }
}
