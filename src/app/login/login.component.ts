import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage!: string;
  userLogin!: Users;

  constructor(private formbuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
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

  async login(): Promise<void> {
    this.userLogin = this.loginForm.value;

    (await this.usersService.getUser(this.userLogin.username, this.userLogin.password))
      .subscribe((user: any) => {
        if (user) {
          this.usersService.setLoggedInUser(user);
          console.log(this.usersService.getLoggedInUser());
          alert('Login Successful');
          this.loginForm.reset();
          this.router.navigate(['./account-summary']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
  clearErrorMessage(fieldName: string): void {
    // Assuming you have corresponding error messages like 'usernameError', 'passwordError', etc.
    const errorFieldName = `${fieldName}Error`;
    // Clear the error message
    this.errorMessage = '';
  }
  
}
