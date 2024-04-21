import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  Subscription,
  catchError,
  mergeMap,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private readonly refreshBufferTime = 2 * 60 * 1000; // 2 minutes in milliseconds
  private tokenExpirationSubscription!: Subscription;

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
          this.startTokenRefresh();
        }),
        mergeMap((user) => {
          return this._userService.get(user._id);
        }),
      );
  }

  signOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.stopTokenRefresh();
  }

  register(registerFormValues: any) {
    return this.httpClient.post('/auth/register', registerFormValues);
  }

  verifyAccount(token: string) {
    const params = new HttpParams().append('skipErrorMessage', true);
    return this.httpClient.get(`/auth/account_confirmation/${token}`, {
      params,
    });
  }

  forgotPassword(body: { email: string }) {
    return this.httpClient.post<{ message: string }>(
      '/auth/forgot-password',
      body,
    );
  }

  resetPassword(password: string, token: string) {
    return this.httpClient.post<{ message: string }>('/auth/reset-password', {
      password,
      token,
    });
  }

  check(): Observable<boolean> {
    if (this.isAuthenticated) {
      return of(true);
    }

    if (this.accessToken) {
      return this._userService.signInUsingToken(this.accessToken).pipe(
        switchMap((res) => {
          this.isAuthenticated = true;
          this.accessToken = res.token;
          this.startTokenRefresh();
          return this._userService.get(res.id);
        }),
        catchError(() => of(false)),
      );
    }

    return of(false);
  }

  // Refresh Token

  startTokenRefresh(): void {
    const refreshInterval = this.calculateRefreshInterval();
    if (!refreshInterval) return;

    this.tokenExpirationSubscription = timer(refreshInterval)
      .pipe(switchMap(() => this.refreshToken()))
      .subscribe({
        next: (res) => {
          this.accessToken = res.accessToken;
          this.startTokenRefresh(); // Restart the process
        },
      });
  }

  refreshToken() {
    return this.httpClient.post<{ accessToken: string; id: string }>(
      '/auth/refresh-token',
      { token: this.accessToken },
    );
  }

  calculateRefreshInterval(): number {
    const remainingTime = this.getRemainingTimeUntilExpiration();
    return remainingTime - this.refreshBufferTime;
  }

  getRemainingTimeUntilExpiration(): number {
    const decoded = jwtDecode(this.accessToken);

    if (decoded && decoded.exp) {
      const expirationTimeInSeconds = decoded.exp;
      const expirationTimeInMillis = expirationTimeInSeconds * 1000;
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expirationTimeInMillis).getTime();

      return expirationTime - currentTime;
    }

    return 0;
  }

  stopTokenRefresh(): void {
    if (this.tokenExpirationSubscription) {
      this.tokenExpirationSubscription.unsubscribe();
    }
  }
}
