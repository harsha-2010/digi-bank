// transfer.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../services/transfer.service';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Transactions } from '../models/transactions';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  sourceAccount: string = '';
  destinationAccount: string = '';
  amount: number = 0;
  transferDate: Date = new Date();
  transferForm: FormGroup;
  errorMessage!: string;
  submitted = false;

  constructor(private transferService: TransferService, private formBuilder: FormBuilder, private router: Router, private accountService: AccountService) {
    this.transferForm = this.formBuilder.group({
      sourceAccount: [this.accountService.getCurrentAccount(), Validators.required],
      payeeName: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      payeeBankName: ['', Validators.required],
      payeeBankIfscCode: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1), Validators.max(1000000)]],
    });
  }

  transferFunds(): void {
    try {

          this.submitted = true;
          if(this.transferForm.invalid){
            return;
          }
          const newTransaction = {
            id: '',
            accountNumber: this.transferForm.value.sourceAccount,
            destinationAccountNumber: this.transferForm.value.destinationAccount,
            description: '',
            amount: this.transferForm.value.amount,
            date: new Date(),
          };
  
          // Add the new account to the accounts list
          this.transferService.transferFunds(newTransaction).subscribe(() => {
            console.log('Transaction Successful:', newTransaction);
            // Redirect to account summary page or wherever needed
            alert("Transaction Successful. Do you wish to navigate away ?");
            this.router.navigate(['/account-details']);
          });
        }         
      catch (error) {
        this.errorMessage = "Please fill all the required fields and ensure that amount doesn't exceed 1,000,000 !!"
        console.log("Error in performing the transaction");
      }
  }
}