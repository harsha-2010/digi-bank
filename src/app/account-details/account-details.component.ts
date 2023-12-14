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
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';
import { CurrencyConfigurationService } from '../services/currency-configuration.service';

declare const particlesJS: any;

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
  loggedIn: boolean = false;
  loggedInUser!: Users | undefined;
  loggedInUserName!: string | undefined;


  // MatTableDataSource is used for providing data to the MatTable
  dataSource = new MatTableDataSource<Transactions>(this.transactions);

  displayedColumns: string[] = ['id', 'accountNumber', 'destinationAccountNumber', 'amount', 'description', 'date'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  innerHTML: any;

  currencySymbol: string = this.currencyService.currencysymbol;

  constructor(private accountService: AccountService, private router: Router, private usersService: UsersService, private currencyService: CurrencyConfigurationService) {}


  ngOnInit(): void {
    // Get the current account number from the cookie
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
    this.dataSource.sort.direction = 'desc';
    this.dataSource.sort.active = 'date';
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //If the dataSource has a filterPredicate, apply it to filter the rows
    if (this.dataSource.filterPredicate) {
      this.dataSource.filterPredicate = this.createFilterPredicate();
    }
  }
  private createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const normalizedFilter = filter.trim().toLowerCase();
  
      for (const column of this.displayedColumns) {
        // Check if the column is 'date' or 'amount'
        if (column === 'date') {
          // Custom filter logic for the 'date' column
          if (data.date) {
            const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
            });
  
            if (formattedDate.toLowerCase().includes(normalizedFilter)) {
              return true;
            }
          }
        } else {
          // Default filter logic for other columns
          const columnValue = data[column].toString().toLowerCase();
          if (columnValue.includes(normalizedFilter)) {
            return true;
          }
        }
      }
  
      return false;
    };
  }
  

  // private createFilterPredicate(): (data: any, filter: string) => boolean {
  //   return (data, filter) => {
  //     // Custom filter logic for the 'date' column
  //     if (data.date) {
  //       const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
  //         month: 'short',
  //         day: 'numeric',
  //         year: 'numeric',
  //         hour: 'numeric',
  //         minute: 'numeric',
  //         second: 'numeric',
  //         hour12: true,
  //       });
  //       return formattedDate.toLowerCase().includes(filter);
  //     }
  //     // Custom filter logic for the 'amount' column
  //   // if (data.amount) {
  //   //   // Remove non-numeric characters (except dot) from both amount and filter
  //   //   const amountWithoutSymbol = data.amount.toString().replace(/[^0-9.]+/g, '');
  //   //   const filterWithoutSymbol = filter.replace(/[^0-9.]+/g, '');
  //   //   return amountWithoutSymbol.includes(filterWithoutSymbol);
  //   // }

  //     // Default filter logic for other columns
  //     return data.toString().toLowerCase().includes(filter);
  //   };
  // }

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

