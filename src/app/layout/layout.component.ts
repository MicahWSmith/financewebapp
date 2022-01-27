import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sideBarExpanded = true;
  display = true;
  constructor() { }

  ngOnInit(): void {
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

}
