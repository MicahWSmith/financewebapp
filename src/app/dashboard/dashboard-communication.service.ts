import { Injectable } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  User = {
    fName: 'Dakota',
    lName: 'Korn'
  }

  SideBar: SidebarComponent = new SidebarComponent(this);
  Main: MainComponent = new MainComponent(this);

  constructor() { }

  setSidebar(component:SidebarComponent){
    this.SideBar = component;
  }

  setMain(component:MainComponent){
    this.Main = component;
  }

  setView(view:string){
    this.Main.setView(view);
  }

  getFirstName():string{
    return this.User.fName;
  }
}
