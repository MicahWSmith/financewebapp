import { Injectable } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardAccountComponent } from './dashboard-account/dashboard-account.component';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  User!:User;
  AppComponent!: AppComponent;
  SideBar: SidebarComponent = new SidebarComponent(this);
  Main: MainComponent = new MainComponent(this);
  
  Home!: DashboardHomeComponent;
  Account!: DashboardAccountComponent;
  authService!: AuthService;

  constructor(auth:AuthService, private router: Router) {
    this.authService = auth; 
  }

  getUserFromSession(){
    let body = {
      token: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : ""
    }

    this.authService.getUserData(body).subscribe(res => {
      this.User = res.data;
      this.SideBar.setUser(this.User);  
      this.AppComponent.setLoggedIn(); 
    })
  }

  setMain(component:MainComponent){
    this.Main = component;
  }

  setView(view:string){
    this.Main.setView(view);
  }

  setSidebar(component:SidebarComponent){
    this.SideBar = component;
  }

  setHome(component: DashboardHomeComponent){
    this.Home = component;
    this.Home.setUser(this.User);
  }

  setAccount(component: DashboardAccountComponent){
    this.Account = component;
  }

  setAppComponent(component: AppComponent){
    this.AppComponent = component;
  }

  getUser(): User{
    return this.User;
  }

  updateUser(user: User){
    this.User = user;
    this.SideBar.setUser(this.User);
    this.Home.setUser(this.User);
  }

  logout(){
    let body = {
      token: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : ""
    }

    this.authService.logout(body);
    localStorage.removeItem('view');
    this.AppComponent.setLoggedOut();
    this.router.navigate(['/']);
  }
}
