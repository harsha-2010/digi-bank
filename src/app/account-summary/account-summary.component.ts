// account-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { Router } from '@angular/router';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css'],
})
export class AccountSummaryComponent implements OnInit {
  accounts: Account[] | undefined = [];
  accountDetails!: AccountDetailsComponent
  showMaxAccountLimitError = false;
  user: Users | undefined;
  username!: string | undefined;
  password!: string | undefined;
  msg!: string;

  constructor(private accountService: AccountService, private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser(): Promise<void> {
    try {
      this.user = this.usersService.getLoggedInUser();
      await this.loadAccounts(this.user?.username, this.user?.password);
    } catch (error) {
      console.error('Error loading user or accounts:', error);
    }
  }


  async loadAccounts(username: string | undefined, password: string | undefined): Promise<void> {
    try {
      if (username !== undefined && password !== undefined) {
        const accounts = await this.accountService.getAccounts(username, password).toPromise();
        this.accounts = accounts;
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  }
  

  async addNewAccount(): Promise<void> {
    try {
      await this.loadAccounts(this.user?.username, this.user?.password);
      
      if (this.user?.username !== undefined && this.user?.password !== undefined) {
        console.log(this.user.username, this.user.password);
  
        if (!this.isMaxAccountsReached()) {
          this.router.navigate(['/account-form']);
        } else {
          this.showMaxAccountLimitError = true;
          console.log("Max Limit Reached");
        }
      }
    } catch (error) {
      console.error('Error adding new account:', error);
    }
  }  

  isMaxAccountsReached(): boolean {
    return this.accounts !== undefined && this.accounts.length >= 10;
  }
  

  viewDetails(accountNumber: string): void {
    // Set the current account number in the service
    this.accountService.setCurrentAccount(accountNumber);

    // Navigate to the account details page
    this.router.navigate(['/account-details']);
  }

}
