import { Component, OnInit } from '@angular/core';
import { DashboardCommunicationService } from '../dashboard-communication.service';

@Component({
  selector: 'dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  fName!:string;
  space: string = '    ';
  sentenceA: string = `${this.space}As a valued member of our community, we appreciate your trust in us, and look forward to working with you to secure your future!`;
  sentenceB: string = 'As always, if you have any questions or concerns, feel free to contact one of our customer service team members, and we will work to find a solution as quickly as possible!';
  sentenceC: string = 'Please take some time to explore all of the features we have to offer to you.';


  constructor(private dashboardCommunicationService: DashboardCommunicationService) { 
    this.fName = dashboardCommunicationService.getFirstName();
  }

  ngOnInit(): void {
  }


  scrollDown(page:number){
    var elmnt = document.getElementById(`page-${page}`);
    elmnt?.scrollIntoView();
    
  }

}
