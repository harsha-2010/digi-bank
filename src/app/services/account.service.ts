// account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Account } from '../models/account';
import { Transactions } from '../models/transactions';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrlAccounts = 'http://localhost:3000/Accounts';
  private apiUrlTransactions = 'http://localhost:3000/Transactions';
  currentAccountNumber!: string;
  currentAccount!: Account | undefined;
  currentAccountBalance!: number;
  private readonly ACCOUNT_COOKIE_KEY = 'account_cookie';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getAccounts(username: string, password: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrlAccounts).pipe(
      map((accounts: Account[] | undefined) => {
        if (!accounts) {
          throw new Error('Accounts not found or undefined');
        }
  
        // Filter accounts based on the provided username and password
        return accounts.filter(account => account.username === username && account.password === password);
      }),
      catchError(error => {
        console.error('Error fetching accounts:', error);
        throw error;
      })
    );
  }

  public getAccountDetailsByAccountNumber(accountNumber: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrlAccounts).pipe(
      map((accounts: Account[]) => {
        // Filter accounts based on the provided username and password
        return accounts.filter(account => account.accountNumber === accountNumber);
      }),
      catchError(error => {
        console.error('Error fetching accounts !!', error);
        throw error;
      })
    );
  }

  public addAccount(account: Account): Observable<Account> {
    // Generate a unique ID (assuming you are using string IDs)
    account.id = this.generateUniqueId();
    account.availableBalance = this.generateRandomBalance();
    account.ifscCode = this.generateIfscCode(account.zip);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("from service " + account.id);

    // Make the HTTP request
    return this.http.post<Account>(this.apiUrlAccounts, account, { headers });
  }

  public updateAccountBalance(accountNumber: string, updatedBalance: number): void {
    this.getAccountDetailsByAccountNumber(accountNumber).subscribe(
      (data) => {
        // Assuming you want to update the first account found
        this.currentAccount = data.find(
          (account) => account.accountNumber === accountNumber
        );
  
        if (this.currentAccount) {
          // Update the balance
          this.currentAccount.availableBalance = this.currentAccount.availableBalance + updatedBalance;
  
          // Now you can use this.currentAccount for further operations
        } else {
          console.error('Account not found');
        }
      },
      (error) => {
        console.error('Error fetching accounts !!', error);
      }
    );
  }

  public getAccountBalance(accountNumber: string): Observable<number> {
    return this.getAccountDetailsByAccountNumber(accountNumber).pipe(
      map((data) => {
        const currentAccount = data.find((account) => account.accountNumber === accountNumber);
        if (currentAccount) {
          // Return the available balance
          return currentAccount.availableBalance;
        } else {
          // Handle the case where the account is not found
          throw new Error('Account not found');
        }
      }),
      catchError((error) => {
        console.error('Error fetching account details:', error);
        // Forward the error
        throw error;
      })
    );
  }
  
  

  public getTransactions(accountNumber: string): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(this.apiUrlTransactions).pipe(
      map((transactions: Transactions[]) => {
        // Filter accounts based on the provided username and password
        return transactions.filter(transaction => transaction.accountNumber === accountNumber);
      }),
      catchError(error => {
        console.error('Error fetching accounts:', error);
        throw error;
      })
    );
  }

  public addTransaction(transaction: Transactions): Observable<Transactions> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Transactions>(this.apiUrlTransactions, transaction, { headers }).pipe(
      map((newTransaction: Transactions) => {
        console.log('Transaction added successfully:', newTransaction);
        return newTransaction;
      }),
      catchError(error => {
        console.error('Error adding transaction:', error);
        throw error;
      })
    );
  }

  setCurrentAccount(accountNumber: string): void {
    this.cookieService.set(this.ACCOUNT_COOKIE_KEY, accountNumber);
  }

  getCurrentAccount(): string | null {
    return this.cookieService.get(this.ACCOUNT_COOKIE_KEY) || null;
  }

  // public generateTransactions(): any {
  //   const getRandomAmount = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

  //   const generateTransaction = (
  //     id: number,
  //     accountNumber: string,
  //     amount: number,
  //     description: string,
  //     date: string,
  //     destinationAccountNumber: string
  //   ) => ({
  //     id,
  //     accountNumber,
  //     destinationAccountNumber, // Include destinationAccountNumber in the transaction
  //     amount,
  //     description,
  //     date
  //   });    

  //   const generateTransactionsForAccount = (accountNumber: string, numberOfTransactions: number) => {
  //     const transactions = [];
  //     for (let i = 1; i <= numberOfTransactions; i++) {
  //       const amount = getRandomAmount(-1000, 1000);
  //       const description = amount < 0 ? 'Debit' : 'Credit';
  //       const date = new Date(2023, getRandomAmount(0, 11), getRandomAmount(1, 28), getRandomAmount(0, 23), getRandomAmount(0, 59));
  //       const destinationAccountNumber = new Date().getTime().toString();
  //       transactions.push(generateTransaction(i, accountNumber, amount, description, date.toISOString(), destinationAccountNumber));
  //     }
  //     return transactions;
  //   };
    
  //   const accountNumbers = [
  //     "123456789",
  //     "987654321",
  //     "1701549367134",
  //     "1701549510383",
  //     "1701601099872",
  //     "1701604698207",
  //     "1701881609099",
  //     "1701886974344",
  //     "1701887387212"
  //   ];

  //   const allTransactions: { id: any; accountNumber: any; destinationAccountNumber: any; amount: any; description: any; date: any; }[] = [];

  //   accountNumbers.forEach((accountNumber, index) => {
  //     const transactionsForAccount = generateTransactionsForAccount(accountNumber, 50);
  //     allTransactions.push(...transactionsForAccount);
  //   });

  //   console.log(JSON.stringify(allTransactions, null, 2));

  // }

  // Function to generate a unique ID
  private generateUniqueId(): string {
    // You can implement your own logic to generate a unique ID
    // For simplicity, this example uses a timestamp as the ID
    return Math.round(new Date().getTime() / 1000).toString();
  }

  public generateRandomBalance(): number {
    // Example usage
    const minBalance = 100; // Minimum balance amount
    const maxBalance = 10000; // Maximum balance amount
  
    return Math.floor(Math.random() * (maxBalance - minBalance + 1) + minBalance);
  }
  
  public generateIfscCode(zip: number): string {
    return "DIGI"+ Math.floor(Math.random() * 10).toString() + zip.toString()
  }

  logout(): void {
    this.currentAccount = undefined;
    this.cookieService.delete(this.ACCOUNT_COOKIE_KEY);
  }
}
