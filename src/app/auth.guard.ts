import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router ){}

  async canActivate(): Promise<boolean> {
    const authorized = await this.authService.loggedIn();

    if(authorized){
      return authorized;
    }
    else{
      this.router.navigate(['/']);
      return authorized;
    }
  }
  
}
