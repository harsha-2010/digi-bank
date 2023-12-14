// transfer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../services/transfer.service';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Transactions } from '../models/transactions';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users';

declare const particlesJS: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit{
  sourceAccount: string = '';
  destinationAccount: string = '';
  amount: number = 0;
  transferDate: Date = new Date();
  transferForm: FormGroup;
  errorMessage!: string;
  submitted = false;
  goBackFlag = false;
  payAgainFlag = false;
  currentAccountNumber!: any;
  Balance!: number;
  insufficientFundsError!: string;
  insufficientFundsErrorMessage!: string;
  loggedIn: boolean = false;
  loggedInUser!: Users | undefined;
  loggedInUserName!: string | undefined;

  constructor(private transferService: TransferService, private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private usersService: UsersService) {
    this.transferForm = this.formBuilder.group({
      sourceAccount: [this.accountService.getCurrentAccount(), Validators.required],
      payeeName: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      payeeBankName: ['', Validators.required],
      payeeBankIfscCode: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1), Validators.max(1000000)]],
    });
  }

  ngOnInit(): void {
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
    this.currentAccountNumber = this.accountService.getCurrentAccount();
    this.accountService.getAccountBalance(this.currentAccountNumber).subscribe(
      (currentAccountBalance) => {
        console.log('Received Account Balance:', currentAccountBalance);
        this.Balance = currentAccountBalance;
        this.checkAccountBalanceValidation();
      },
      (error) => {
        console.error('Error fetching account balance:', error);
        // Handle the error
      }
    );
  }

  checkAccountBalanceValidation(): boolean {
    // Access this.Balance here or perform additional logic
    if(this.Balance <= this.transferForm.value.amount){
      return true;
    }
    return false;
  }

  transferFunds(): void {
    try {
          this.submitted = true;
          if(this.transferForm.invalid){
            return;
          }

          // if(this.transferForm.valid){
          //   if(this.checkAccountBalanceValidation()){
          //     this.insufficientFundsError = "Insufficient Funds !! Please enter a lower amount.";
          //     console.log(this.insufficientFundsError);
          //   }
          //   return;
          // }
          const newTransaction = {
            id: '',
            accountNumber: this.transferForm.value.sourceAccount,
            destinationAccountNumber: this.transferForm.value.destinationAccount,
            description: 'Debit',
            amount: this.transferForm.value.amount,
            date: new Date(),
          };
  
          // Add the new account to the accounts list
          this.transferService.transferFunds(newTransaction).subscribe(() => {
            console.log('Transaction Successful:', newTransaction);
            alert("Transaction Successful");
            this.goBackFlag = true;
            this.payAgainFlag = true;
          });
        }         
      catch (error) {
        this.insufficientFundsErrorMessage = this.insufficientFundsError;
        this.errorMessage = "Please fill all the required fields and ensure that amount doesn't exceed 1,000,000 !!"
        console.log("Error in performing the transaction");
      }
  }

  goBack(): void {
    if(this.submitted && this.goBackFlag){
      this.router.navigate(['/account-details']);
    }
  }

  payAgain(): void {
    if (this.submitted && this.payAgainFlag) {
      this.goBackFlag = false; // Hide the navigation buttons
      this.payAgainFlag = false;
      this.submitted = false;
    }
  }
  
}