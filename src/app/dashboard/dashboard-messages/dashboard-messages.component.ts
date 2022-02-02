import { DashboardCommunicationService } from '../dashboard-communication.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'dashboard-messages',
  templateUrl: './dashboard-messages.component.html',
  styleUrls: ['./dashboard-messages.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardMessagesComponent implements AfterViewInit {

  fName: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ELEMENT_DATA = [
    {Date: "February 10th, 2022", Sender: 'Condor Financial', Subject: 'Let us help you.', Category: 'Important',
       Message: `\n Hello, \n\n Have you set up your two-factor authentication yet? If not, go to the following link to set it up:    https://fakesetuplink.com\n\n Sincerely,\n The Condor Financial Team`},
    {Date: "February 10th, 2022", Sender: 'William Myers (CEO of Condor Financial)', Subject: 'Welcome!', Category: 'Regular',
       Message: '\n Hello,\n\n Welcome to the Condor Financial community. We look forward to assisting you in reaching your financial goals!\n\n\n\n Wish you the best,\n\n Willam Myers'}
  ];

  
  dataSource = new MatTableDataSource<Object>(this.ELEMENT_DATA);
  columnsToDisplay = ['Sender', 'Subject', 'Category','Date'];
  expandedElement!: Object | null;
  pageSize = 10;

  constructor(private dashboardCommunicationService: DashboardCommunicationService) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

