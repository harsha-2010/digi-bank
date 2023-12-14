import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Users } from '../models/users';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private apiUrl = 'http://localhost:3000/UsersList';
  newUser!: Users;
  private readonly cookieKey = 'my_auth_cookie';
  private loggedInUser: Users | undefined;

  constructor(private http: HttpClient, private cookieService: CookieService, private accountService: AccountService) {
    const storedUser = this.cookieService.get(this.cookieKey);
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
    }
  }

  public async getUser(username: string, password: string): Promise<Observable<HttpResponse<Users[]>>> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        // Assuming your API returns an array of users
        map(users => users.find((user: any) => user.username === username && user.password === password))
      );
  }
  public async getAll(): Promise<Observable<HttpResponse<Users[]>>> {
    return this.http.get<any>(this.apiUrl);
  }

  // public async setUser(username: string, password: string): Promise<Observable<HttpResponse<Users>>> {
  //   this.newUser = {
  //     id: "100",
  //     username: username,
  //     password: password
  //   };
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post<any>(this.apiUrl, this.newUser,{ headers});
  // }
  public setUser(user: Users): Observable<Users> {
    // Generate a unique ID (assuming you are using string IDs)
    user.id = this.generateUniqueId();

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("from service " + user.password);

    // Make the HTTP request
    return this.http.post<Users>(this.apiUrl, user, { headers });
  }

  setLoggedInUser(user: Users): void {
    this.loggedInUser = user;
    this.cookieService.set(this.cookieKey, JSON.stringify(user));
  }

  getLoggedInUser(): Users | undefined {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = undefined;
    this.cookieService.delete(this.cookieKey);
    this.accountService.logout();
  }

  // Function to generate a unique ID
  private generateUniqueId(): string {
    // You can implement your own logic to generate a unique ID
    // For simplicity, this example uses a timestamp as the ID
    return Math.round(new Date().getTime() / 1000).toString();
  }
}
