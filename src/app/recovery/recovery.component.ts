import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardCommunicationService } from '../dashboard/dashboard-communication.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private dashboardCommunicationService:DashboardCommunicationService
  ) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  userEmail: string = "";
  token: string = "";
  code: string = "";

  validAccountFound: boolean = false;
  failedLogin: boolean = false;

  userRecoveryData(){
    if(!this.email.hasError('email')){
      this.failedLogin = false;
      const body: {} = {
        email: this.userEmail,
      }
      this.authService.getRecoveryData(body).subscribe(res => {
        if(!res.error){
          this.validAccountFound = true;
        }
        else{
          this.failedLogin = true;
          this.validAccountFound = false;
        }
      });
    }
  }

  userRecoveryLogin(){
    if(this.email){
      this.failedLogin = false;
      // make request to api to get token with credentials
      const body: {} = {
        email: this.userEmail,
        code: this.code
      }
      this.authService.recoveryLogin(body).subscribe(res => {
        if(!res.error){
          this.token = res.token;
          sessionStorage.setItem('user', res.token);
          this.dashboardCommunicationService.logoutTimer();
          this.router.navigate(['/dashboard']);
        }
        else{
          this.failedLogin = true;
          this.validAccountFound = false;
        }
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
