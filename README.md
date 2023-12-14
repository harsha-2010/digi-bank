# DIGIBANK

DIGIBANK, an Angular-based banking application, delivers a user-friendly digital banking experience. Users securely log in, accessing a comprehensive account summary that details account numbers, types, and available balances. The application goes beyond by allowing users to register, create new accounts, and seamlessly initiate fund transfers, ensuring swift updates to account balances. Additionally, DIGIBANK features robust sorting, filtering, and pagination options for transaction history, providing users with efficient tools to manage their financial activities.

To facilitate development and testing, DIGIBANK employs a JSON server for data simulation, eliminating the need for an extensive backend infrastructure. The Angular framework powers the frontend, delivering an intuitive interface and effectively handling user interactions. To run the application, users can clone the repository, install dependencies, and start the Angular application alongside the JSON server.

## 1. Environment Setup and Testing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Installing & Running JSON Server

Run `npm install -g json-server@latest` to install the latest version of JSON server. 

Run `json-server --watch db.json` to start the JSON server. Navigate to `http://localhost:3000/`. The data in the db.json will automatically gets updated with user interactions.

Run `http://localhost:3000/Users` to view the list of users in the JSON server.

Run `http://localhost:3000/Accounts` to view the list of accounts in the JSON server.

Run `http://localhost:3000/Transactions` to view the list of transactions in the JSON server.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## 2. Project Structure

### Models
* Users
* Account
* Transactions

### Components
* LoginComponent
* SignUpComponent
* HomeComponent
* AccountSummaryComponent
* AccountFormComponent
* AccountDetailsComponent
* TransferComponent
* LogoutComponent

### Services
* AuthenticationService
* UsersService
* AccountService
* TransferService
* CurrencyConfigurationService

### Pipes
* HighlightPipe

### Guard
* AuthGuard

### JSON Server Structure
* db.json
  * Users {}
  * Accounts {}
  * Trnsactions {}

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

