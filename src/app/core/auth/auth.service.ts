import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signIn() {}

  signOut() {}

  register(registerFormValues: any) {
    return this.httpClient.post('/register', registerFormValues);
  }

  verifyAccount(token: string) {
    return this.httpClient.get(`/account_confirmation/${token}`);
  }
}
