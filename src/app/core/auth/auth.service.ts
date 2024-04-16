import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, mergeMap, of, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _userService: UserService,
  ) {}

  set accessToken(token: string) {
    localStorage.setItem('token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post<{ _id: string; token: string }>('/auth/login', credentials)
      .pipe(
        tap((user) => {
          this.accessToken = user.token;
          this.isAuthenticated = true;
        }),
        mergeMap((user) => {
          localStorage.setItem('userId', user._id);
          return this._userService.get();
        }),
      );
  }

  signOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  register(registerFormValues: any) {
    return this.httpClient.post('/auth/register', registerFormValues);
  }

  verifyAccount(token: string) {
    return this.httpClient.get(`/auth/account_confirmation/${token}`);
  }

  forgotPassword(body: { email: string }) {
    return this.httpClient.post<{ message: string }>(
      '/auth/forgot-password',
      body,
    );
  }

  check(): Observable<boolean> {
    if (this.isAuthenticated) {
      return of(true);
    }

    // Refresh token next time
    if (this.accessToken) {
      return this._userService.get();
    }

    return of(false);
  }
}
