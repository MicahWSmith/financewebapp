import { Injectable } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  User!:User;

  SideBar: SidebarComponent = new SidebarComponent(this);
  Main: MainComponent = new MainComponent(this);
  authService!: AuthService;

  

  constructor(auth:AuthService) {
    this.authService = auth; 
   }

  setSidebar(component:SidebarComponent){
    this.SideBar = component;
  }

  setMain(component:MainComponent){
    this.Main = component;
  }

  setView(view:string){
    this.Main.setView(view);
  }

  setUser(user:User){
    this.User = user;
    console.log("Dashboard Communication Service: ", this.User);
    this.SideBar.setUser();
  }

  getUser(): User{
    return this.User;
  }

  getAuthService(): AuthService{
    return this.authService;
  }
}
