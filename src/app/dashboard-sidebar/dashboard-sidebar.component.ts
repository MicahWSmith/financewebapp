import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  loggedIn = false;

  constructor() { }

  ngOnInit(): void {
  }


  login(){
    console.log('Login!');
  }

  createAccount(){
    console.log('Create Account!');
  }
}
