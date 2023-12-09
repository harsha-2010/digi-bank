// signup.component.ts
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  errorMessage!: string;
  newUser!: Users;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: [''],
      email: ['', [Validators.required,Validators.email]],
      mobile: [ , Validators.minLength(10)],
      city: [''],
      zip: [null]
    });
  }

  async signup(): Promise<void> {
    this.submitted = true; // Set submitted to true when the form is submitted
  
    if (this.signupForm.invalid) {
      return;
    }
  
    this.newUser = this.signupForm.value;
  
    try {
      await this.usersService.setUser(this.newUser).toPromise();
      console.log('User added successfully');
      alert('SignUp Successful');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error adding user:', error);
      this.errorMessage = 'Error in Signing Up';
    }
  }  
    
}
