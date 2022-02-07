import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardCommunicationService } from '../dashboard/dashboard-communication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sideBarExpanded = true;
  display = true;
  toggleDisplay = true;

  constructor(private dashboardCommunicationService: DashboardCommunicationService) {
    dashboardCommunicationService.setLayout(this);
   }

  ngOnInit(): void {
  
  }

  showSidebarToggleButton(){
    this.toggleDisplay = true;
  }

  hideSidebar(){
    this.sideBarExpanded = false;
    this.toggleDisplay = false;
  }

  toggleSideBar(){
    this.sideBarExpanded = !this.sideBarExpanded;
    
    if(this.sideBarExpanded){
      setTimeout(() =>{
        this.display = true;
      },300)
    }
    else{
      setTimeout(() =>{
        this.display = false;
      },300)
    }
  }

  @HostListener('window:resize', ['$event'])
      onResize(event:any) {
        if(event.target.innerWidth > 1800){
          this.sideBarExpanded = true;
          this.display = true;
          
        }
       
}

}
