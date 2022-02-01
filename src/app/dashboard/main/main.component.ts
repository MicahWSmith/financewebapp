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
    let savedView = localStorage.getItem('view');
    
    if(savedView != null){
      this.view = savedView;
    }

  }

  setView(view:string){
    this.view = view;
    localStorage.setItem('view', view);
  }


}
