import { Component, OnInit } from '@angular/core';
import { DashboardCommunicationService } from '../dashboard-communication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  view = 'home';

  constructor(private dashboardCommunicationService: DashboardCommunicationService) { 
    dashboardCommunicationService.setMain(this);
  }

  ngOnInit(): void {
  }

  setView(view:string){
    this.view = view;
  }


}
