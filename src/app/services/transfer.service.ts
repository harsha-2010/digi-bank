// transfer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Transactions } from '../models/transactions';
import { AccountService } from './account.service';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = 'http://localhost:3000/Transactions';
  selectedAccount!: Account;
  transactions: Transactions[] = [];
  dataSource: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  // transferFunds(transferDetails: Transactions): Observable<any> {
  //   // Perform the transfer logic
  //   transferDetails.id = this.generateUniqueId();
  //   if(transferDetails.accountNumber==transferDetails.destinationAccountNumber){
  //     transferDetails.description = "Credit";
  //   }
  //   else{
  //     transferDetails.description = "Debit";
  //     transferDetails.amount = -transferDetails.amount;
  //   }

  //   this.accountService.updateAccountBalance(transferDetails.accountNumber, transferDetails.amount);

  //   // Save the updated account details back to the db.json file
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');    
  //   // Return the HTTP post observable (if needed)
  //   return this.http.post<Transactions>(this.apiUrl, transferDetails, { headers });
  // }

  // transferFunds(transferDetails: any): Observable<any> {
  //   transferDetails.id = this.generateUniqueId();
    
  //   // Retrieve the account details for the source account
  //   return this.accountService.getAccountDetailsByAccountNumber(transferDetails.accountNumber).pipe(
  //     tap((sourceAccountList: Account[]) => {
  //       const sourceAccount = sourceAccountList.find(account => account.accountNumber === transferDetails.accountNumber);

  //       if (sourceAccount) {
  //         // Update the availableBalance for the source account
  //         sourceAccount.availableBalance -= transferDetails.amount;

  //         // Save the updated account details back to the db.json file
  //         const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //         const apiUrlSourceAccount = 'http://localhost:3000/Accounts/' + sourceAccount.id;

  //         this.http.put(apiUrlSourceAccount, sourceAccount, { headers }).subscribe(
  //           () => {
  //             console.log('Source account balance updated successfully.');

  //             // Add the transferDetails to the transactions list of the source account
  //             const transaction: Transactions = {
  //               id: transferDetails.id,
  //               accountNumber: sourceAccount.accountNumber,
  //               destinationAccountNumber: transferDetails.destinationAccountNumber,
  //               amount: transferDetails.amount,
  //               description: transferDetails.description,
  //               date: transferDetails.date,
  //             };

  //             // Add the new transaction to the source account's transactions list
  //             this.accountService.addTransaction(transaction).subscribe(
  //               () => {
  //                 console.log('Transaction added successfully.');
  //               },
  //               (error) => {
  //                 console.error('Error adding transaction:', error);
  //               }
  //             );
  //           },
  //           (error) => {
  //             console.error('Error updating source account balance:', error);
  //           }
  //         );
  //       } else {
  //         console.error('Source account not found.');
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching source account details:', error);
  //       throw error;
  //     })
  //   );
  // }

  transferFunds(transferDetails: any): Observable<any> {
    // Generate unique IDs for source and destination transactions
    const sourceTransactionId = this.generateUniqueId();
    const destinationTransactionId = this.generateUniqueId();
  
    // Retrieve the account details for the source account
    return this.accountService.getAccountDetailsByAccountNumber(transferDetails.accountNumber).pipe(
      tap((sourceAccountList: Account[]) => {
        const sourceAccount = sourceAccountList.find(account => account.accountNumber === transferDetails.accountNumber);
  
        if (sourceAccount) {
          // Update the availableBalance for the source account
          sourceAccount.availableBalance -= transferDetails.amount;
  
          // Save the updated source account details
          const headers = new HttpHeaders().set('Content-Type', 'application/json');
          const apiUrlSourceAccount = 'http://localhost:3000/Accounts/' + sourceAccount.id;
  
          this.http.put(apiUrlSourceAccount, sourceAccount, { headers }).subscribe(
            () => {
              console.log('Source account balance updated successfully.');
  
              // Add the transferDetails to the transactions list of the source account
              const sourceTransaction: Transactions = {
                id: sourceTransactionId,
                accountNumber: sourceAccount.accountNumber,
                destinationAccountNumber: transferDetails.destinationAccountNumber,
                amount: transferDetails.amount,
                description: transferDetails.description,
                date: transferDetails.date,
              };
  
              // Add the new transaction to the source account's transactions list
              this.accountService.addTransaction(sourceTransaction).subscribe(
                () => {
                  console.log('Source transaction added successfully.');
  
                  // Retrieve the account details for the destination account
                  this.accountService.getAccountDetailsByAccountNumber(transferDetails.destinationAccountNumber).pipe(
                    tap((destinationAccountList: Account[]) => {
                      const destinationAccount = destinationAccountList.find(account => account.accountNumber === transferDetails.destinationAccountNumber);
  
                      if (destinationAccount) {
                        // Update the availableBalance for the destination account
                        destinationAccount.availableBalance += transferDetails.amount;
  
                        // Save the updated destination account details
                        const apiUrlDestinationAccount = 'http://localhost:3000/Accounts/' + destinationAccount.id;
  
                        this.http.put(apiUrlDestinationAccount, destinationAccount, { headers }).subscribe(
                          () => {
                            console.log('Destination account balance updated successfully.');
  
                            // Add the transferDetails to the transactions list of the destination account with description as "Credit"
                            const destinationTransaction: Transactions = {
                              id: destinationTransactionId,
                              accountNumber: destinationAccount.accountNumber,
                              destinationAccountNumber: transferDetails.accountNumber,
                              amount: transferDetails.amount,
                              description: 'Credit',
                              date: transferDetails.date,
                            };
  
                            // Add the new transaction to the destination account's transactions list
                            this.accountService.addTransaction(destinationTransaction).subscribe(
                              () => {
                                console.log('Destination transaction added successfully.');
                              },
                              (error) => {
                                console.error('Error adding destination transaction:', error);
                              }
                            );
                          },
                          (error) => {
                            console.error('Error updating destination account balance:', error);
                          }
                        );
                      } else {
                        console.error('Destination account not found.');
                      }
                    }),
                    catchError(error => {
                      console.error('Error fetching destination account details:', error);
                      throw error;
                    })
                  ).subscribe();
                },
                (error) => {
                  console.error('Error adding source transaction:', error);
                }
              );
            },
            (error) => {
              console.error('Error updating source account balance:', error);
            }
          );
        } else {
          console.error('Source account not found.');
        }
      }),
      catchError(error => {
        console.error('Error fetching source account details:', error);
        throw error;
      })
    );
  }  
  
  generateUniqueId(): string {
    const uniqueIdLength = 10;
    let uniqueId = '';
  
    while (uniqueId.length < uniqueIdLength) {
      // Generate a random digit (0-9) and append it to the ID
      const randomDigit = Math.floor(Math.random() * 10);
      uniqueId += randomDigit.toString();
    }
  
    return uniqueId;
  }
}