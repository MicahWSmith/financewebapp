import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password: string = "";
  token: string = "";

  failedLogin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  userLogin(){
    if(!this.email.hasError('email') && this.password){
      this.failedLogin = false;
      // make request to api to get token with credentials
      let body: {} = {
        email: this.email,
        password: this.password
      }
      this.authService.getToken(body).subscribe(token => {
        this.token = token;
      });
    }
    else if(!this.password){
      this.failedLogin = true;// TODO: Move this to where response comes back not found from api
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
