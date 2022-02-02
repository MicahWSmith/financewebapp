import { Component, OnInit } from '@angular/core';
import { DashboardCommunicationService } from '../dashboard-communication.service';
import { User } from '../../models/user.model'
@Component({
  selector: 'dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  User!:User;
  fName!:string;
  
  page1_sentenceA: string = `As a valued member of our community, we appreciate your trust in us, and look forward to working with you to secure your future!`;
  page1_sentenceB: string = 'As always, if you have any questions or concerns, feel free to contact one of our customer service team members, and we will work to find a solution as quickly as possible!';
  page1_sentenceC: string = 'Please take some time to explore all of the features we have to offer to you.';

  page2_title: string = 'We understand how much the security of your assets means to you.'
  page2_sentenceA: string = "Saving for your family's future has never been more safe.";
  page2_sentenceB: string = 'At Condor Financial, we provide our members with multiple layers of protection to help keep their account secure, including:';

  page3_title: string = 'We make it easy to organize your funds.'
  page3_sentenceA: string = 'We have you covered from Personal Checking Accounts to IRAs';
  page3_sentenceB: string = 'All of your investments can be found neatly displayed in your Portfolio';
  page3_sentenceC: string = 'Do some research in our various marketplaces';

  page4_title: string = 'We offer the most beneficial investment marketplaces for your portfolio.'
  page4_sentenceA: string = 'Check out the lastest offerings of CDs and Bonds';
  page4_sentenceB: string = 'Browse multiple currencies in our Forex market';
  page4_sentenceC: string = 'Research stock performances with our Mutual Fund and Stock trackers';

  userFound: boolean = false;

  constructor(private dashboardCommunicationService: DashboardCommunicationService) { 
    
  }

  ngOnInit(): void {
    let body = {
      token: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : ""
    }

    this.dashboardCommunicationService.getAuthService().getUserData(body).subscribe(res => {
      this.User = res.data;
      this.userFound = true;
      this.fName = this.User.first;
      this.dashboardCommunicationService.setUser(this.User);
      console.log(this.User);
    })
  }


  scrollDown(page:number){
    var elmnt = document.getElementById(`page-${page}`);
    elmnt?.scrollIntoView();
    
  }

}
