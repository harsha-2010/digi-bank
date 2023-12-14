// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users';

declare const particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  loggedIn: boolean = false;
  loggedInUser!: Users | undefined;
  loggedInUserName!: string | undefined;
  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void{ 
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log("particles.js config loaded");
    });

    if(this.usersService.getLoggedInUser()) {
      this.loggedIn = true;
      this.loggedInUser = this.usersService.getLoggedInUser();
      this.loggedInUserName = this.loggedInUser?.name;
    }
    else {
      this.loggedIn = false;
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  redirectToAccountSummary(): void {
    this.router.navigate(['/account-summary']);
  }
}
