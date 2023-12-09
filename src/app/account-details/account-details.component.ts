// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AccountService } from '../services/account.service';
// import { Account } from '../models/account';
// import { Transactions } from '../models/transactions';
// import { AfterViewInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';

// @Component({
//   selector: 'app-account-details',
//   templateUrl: './account-details.component.html',
//   styleUrl: './account-details.component.css'
// })
// export class AccountDetailsComponent implements OnInit {
//   accountNumber!: string;
//   selectedAccount!: Account;
//   transactions: Transactions[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private accountService: AccountService
//   ) {}
  
//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.accountNumber = params['accountNumber']
//       this.accountService.getAccountDetailsByAccountNumber(this.accountNumber).subscribe((data) => {
//         this.selectedAccount = data.find(
//           (account) => account.accountNumber === this.accountNumber
//         )!;
//       });
//       this.accountService.getTransactions(this.accountNumber).subscribe((data) =>
//         this.transactions = data);
//       });
//       //this.accountService.generateTransactions();
//   }

  
  
//   // async getTransactions(accountNumber: string): Promise<void> {
//   //   try{
//   //     this.accountService.getTransactions(accountNumber).subscribe((data) => {
//   //       this.transactions = data
//   //     });
//   //   }
//   //   catch (error) {
//   //     console.error('Error loading accounts:', error);
//   //   }
//   // }
// }


import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { Transactions } from '../models/transactions';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'] // Corrected property name
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
  accountNumber!: string;
  selectedAccount!: Account;
  transactions: Transactions[] = [];
  showInsufficientFundsError = false;


  // MatTableDataSource is used for providing data to the MatTable
  dataSource = new MatTableDataSource<Transactions>(this.transactions);

  displayedColumns: string[] = ['id', 'accountNumber', 'destinationAccountNumber', 'amount', 'description', 'date'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  innerHTML: any;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Get the current account number from the cookie
    this.accountNumber = this.accountService.getCurrentAccount() || ''; // Provide a default value if it's null
  
    this.accountService.getAccountDetailsByAccountNumber(this.accountNumber).subscribe((data) => {
      this.selectedAccount = data.find(
        (account) => account.accountNumber === this.accountNumber
      )!;
  
      this.accountService.getTransactions(this.accountNumber).subscribe((data) => {
        this.transactions = data;
        this.dataSource.data = this.transactions;
      });
    });
  }  

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchText: string = '';
  onSearchTextChanged(newSearchText: string): void {
    this.searchText = newSearchText;
    console.log(this.searchText);
  }

  public transfer(): void {
    if (this.selectedAccount.availableBalance) {
      this.router.navigate(['/transfer']);
    }
    else {
      this.showInsufficientFundsError = true;
      console.log("Max Limit Reached");
    }
  }

}

