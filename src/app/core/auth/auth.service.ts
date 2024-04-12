import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  set accessToken(token: string) {
    localStorage.setItem('token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient.post('/login', credentials).pipe(
      tap((user: any) => {
        this.accessToken = user.token;
        this.isAuthenticated = true;
      }),
    );
  }

  signOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
    this.isAuthenticated = false;
  }

  register(registerFormValues: any) {
    return this.httpClient.post('/register', registerFormValues);
  }

  verifyAccount(token: string) {
    return this.httpClient.get(`/account_confirmation/${token}`);
  }

  forgotPassword(body: { email: string }) {
    return this.httpClient.post<{ message: string }>('/forgot-password', body);
  }

  check(): boolean {
    return this.isAuthenticated;
  }
}
