// account-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';
import { Account } from '../models/account';

declare const particlesJS: any;

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  user: Users | undefined;
  username!: string;
  password!: string;
  newAccount!: Account;
  loggedInUser!: Users;
  errorMessage!: string;
  submitted = false;
  loggedIn: boolean = false;
  LoggedInUser!: Users | undefined;
  loggedInUserName!: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.accountForm = this.formBuilder.group({
      accountHolderName: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      zip: [Validators.required],
      accountType: ['Savings', Validators.required],
      email: ['', Validators.required],
    });
    
  }

  ngOnInit(): void{ 
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log("particles.js config loaded");
    });
    if(this.usersService.getLoggedInUser()) {
      this.loggedIn = true;
      this.LoggedInUser = this.usersService.getLoggedInUser();
      this.loggedInUserName = this.LoggedInUser?.name;
    }
    else {
      this.loggedIn = false;
    }
  }

  submitForm(): void {
    try {

      this.submitted = true;
      if(this.accountForm.invalid){
        return;
      }

      this.user = this.usersService.getLoggedInUser();
  
      if (this.accountForm.valid) {
  
        // Check if the user is logged in
        if (this.user !== undefined) {
          console.log(this.user);
  
          // Create a new account object
          const newAccount = {
            id: '',
            username: this.user.username,
            password: this.user.password,
            name: this.accountForm.value.accountHolderName,
            email: this.accountForm.value.email,
            mobile: this.accountForm.value.mobile,
            city: this.accountForm.value.city,
            zip: this.accountForm.value.zip,
            accountNumber: new Date().getTime().toString(),
            accountType: this.accountForm.value.accountType.toString(),
            ifscCode: '',
            availableBalance: 0,
          };
  
          // Add the new account to the accounts list
          this.accountService.addAccount(newAccount).subscribe(() => {
            console.log('New account added successfully:', newAccount);
            // Redirect to account summary page or wherever needed
            this.router.navigate(['/account-summary']);
          });
        } else {
          // Handle the case where the user is not logged in
          console.error('User not logged in');
        }
      }
    } catch (error) {
      this.errorMessage = "Please fill all the required fields !!"
    }
  }
}  
