import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HighlightPipe } from './pipes/highlight.pipe';
import { TransferComponent } from './transfer/transfer.component';
import { TransferService } from './services/transfer.service';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AccountSummaryComponent,
    AccountDetailsComponent,
    AccountFormComponent,
    HighlightPipe,
    TransferComponent,
    LogoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [TransferService, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
