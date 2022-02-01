import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  userEmail: string = "";
  password: string = "";
  token: string = "";

  failedLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  userLogin(){
    if(!this.email.hasError('email') && this.password){
      this.failedLogin = false;
      // make request to api to get token with credentials
      let body: {} = {
        email: this.userEmail,
        password: this.password,
        token: this.token
      }
      this.authService.getToken(body).subscribe(res => {
        if(!res.error){
          this.token = res.token;
          sessionStorage.setItem('user', res.token);
          sessionStorage.setItem('loggedIn', true.toString());
          //console.log(sessionStorage.getItem('user'));
          this.router.navigate(['/dashboard']);
        }
        else{
          this.failedLogin = true;
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
