import { Injectable } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardAccountComponent } from './dashboard-account/dashboard-account.component';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { CdComponent } from '../cd/cd.component';
@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  User!:User;
  AppComponent!: AppComponent;
  SideBar: SidebarComponent = new SidebarComponent(this);
  Main: MainComponent = new MainComponent(this);
  landingPage!: HomeComponent;
  Home!: DashboardHomeComponent;
  Account!: DashboardAccountComponent;
  authService!: AuthService;
  cdComponent!: CdComponent;

  timeoutLength: number = 30 * 60 * 1000;
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
      
      if(this.landingPage){
        this.landingPage.setLoggedOn();
      }
      if(this.Home){
        this.Home.setUser(this.User); 
      }
      if(this.Account){
        this.Account.setUser(this.User);
      }
    })
  }


  setCd(component: CdComponent){
    this.cdComponent = component;
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
    
  }

  setAccount(component: DashboardAccountComponent){
    this.Account = component;
  }

  setLandingPage(component: HomeComponent){
    this.landingPage = component;
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

    this.authService.logout(body).subscribe(response => {

      localStorage.removeItem('view');
      if(this.AppComponent){
        this.AppComponent.setLoggedOut();
      }
      if(this.landingPage){
        this.landingPage.setLoggedOff();
      }
      this.router.navigate(['/']);
    })
   
  }

  logoutTimer(){
    setTimeout(()=>{
      this.logout();
    }, this.timeoutLength);
  }
}
