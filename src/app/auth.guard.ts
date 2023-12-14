// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      // Allow access if authenticated
      return true;
    } else {
      // Redirect to login if not authenticated
      alert("Please login to access full functionality of the application");
      return this.router.parseUrl('/login');
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      // If authenticated, check if the current route is the home page
      if (state.url === '/' || state.url === '') {
        // Allow access to the home page
        return true;
      } else {
        // Redirect to home if not on the home page
        return this.router.parseUrl('/');
      }
    } else {
      // Allow access if not authenticated
      return true;
    }
  }
}
