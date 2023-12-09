// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void{ 
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log("particles.js config loaded");
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
