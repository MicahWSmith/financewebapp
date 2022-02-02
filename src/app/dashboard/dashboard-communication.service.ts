import { Injectable } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  User:any = {}

  SideBar: SidebarComponent = new SidebarComponent(this);
  Main: MainComponent = new MainComponent(this);
  authService!: AuthService;

  

  constructor(auth:AuthService) {
    this.authService = auth;

    let token = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : "";

    //console.log("token: ", token);
    let body = {
      token: token
    }
    
     this.authService.getUserData(body).subscribe(res => {
       this.User = res.data;
       console.log(this.User);
     })
    
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

  getFirstName(){
    console.log("First Name: ",this.User.first);
    setTimeout(() => {
      console.log("First Name: ",this.User.first);
    },200)

    return this.User.first;
  }

  getAuthService(): AuthService{
    return this.authService;
  }
}
