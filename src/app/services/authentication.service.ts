// authentication.service.ts

import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { LoginComponent } from '../login/login.component';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedIn: boolean = false;
  user!: Users | undefined;

  constructor(private usersService: UsersService, private loginComponent: LoginComponent) { }
 
  login(): boolean {
    this.loginComponent.login().then((isUserLoggedIn: boolean) => {
      this.isLoggedIn = isUserLoggedIn;
    });
    return this.isLoggedIn;
  }

  logout(): boolean {
    this.usersService.logout();
    return this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    if(this.login()){
      return this.isLoggedIn;
    }
    else{
      return this.logout();
    }
  }
}
