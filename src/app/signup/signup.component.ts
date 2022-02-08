import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  userEmail: string = "";
  password: string = "";
  first: string="";
  last: string="";
  phone: string="";
  security_question: string="";
  security_answer: string="";

  token: string = "";

  // flags
  failedLogin: boolean = false; // for error message
  isDisabled: boolean = true; // for button press

  ngOnInit(): void {
    
  }

  userSignUp(){
    if(!this.email.hasError('email') && this.password && this.first && this.last && this.phone){
      this.failedLogin = false;
      // make request to api to get token with credentials
      let body: {} = {
        email: this.userEmail,
        password: this.password,
        first: this.first,
        last: this.last,
        phone: this.phone,
        security_question: this.security_question,
        security_answer: this.security_answer,
      }
      // create user
      // disable button to prevent spam
      this.isDisabled = true;
      this.userService.addUser(body).subscribe(createRes => {
        if(!createRes.error){
          const message = createRes.message;
          console.log(message);
          // login after user is successfully created
          this.authService.getToken(body).subscribe(res =>{
            if(!res.error){
              sessionStorage.setItem('user', res.token);
              this.router.navigate(['/dashboard']);
            }
          });
        }
        else{
          this.failedLogin = true;
        }
      });
    }
    else{
      this.failedLogin = true;
    }
  }

  checkVals(){
    if(this.email && this.password && this.first && this.last && this.phone){ 
      this.isDisabled = false; 
      return;
    }
    this.isDisabled = true;
    return;
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
