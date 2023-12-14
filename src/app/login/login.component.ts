import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users';

declare const particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage!: string;
  userLogin!: Users;
  submitted: boolean = false;

  constructor(private formbuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log("particles.js config loaded");
    });
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    // Real-time validation using valueChanges
    this.loginForm.get('password')?.valueChanges
      .pipe(debounceTime(300)) // Adjust debounce time based on your needs
      .subscribe(() => {
        this.loginForm.get('password')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });
  }

  async login(): Promise<boolean> {
    this.userLogin = this.loginForm.value;
    this.submitted = true;
    (await this.usersService.getUser(this.userLogin.username, this.userLogin.password))
      .subscribe((user: any) => {
        if (user) {
          this.usersService.setLoggedInUser(user);
          console.log(this.usersService.getLoggedInUser());
          const isUserLoggedIn: boolean = true;
          //alert('Login Successful');
          this.loginForm.reset();
          this.router.navigate(['/home']);
          return isUserLoggedIn;
        } else {
          if(this.loginForm.value.username && this.loginForm.value.password){
            this.errorMessage = 'Invalid username or password';
            const isUserLoggedIn: boolean = false;
            return isUserLoggedIn;
          }
          else{
            const isUserLoggedIn: boolean = false
            return isUserLoggedIn;
          }
        }
      });
      return false;
  }
  clearErrorMessage(fieldName: string): void {
    // Assuming you have corresponding error messages like 'usernameError', 'passwordError', etc.
    const errorFieldName = `${fieldName}Error`;
    // Clear the error message
    this.errorMessage = '';
  }
  
}
