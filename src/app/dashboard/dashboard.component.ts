import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideBarExpanded = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sideBarExpanded = !this.sideBarExpanded;
  }

}
