import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private httpClient: HttpClient) {}

  set user(user: User) {
    this._user.next(user);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  get(userId: string): Observable<boolean> {
    const params = new HttpParams().append('showLoader', true);

    return this.httpClient.get<User>(`/user/${userId}`, { params }).pipe(
      mergeMap((user) => {
        this._user.next(user);
        return of(true);
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }

  update(user: User): Observable<any> {
    return this.httpClient.patch<User>('/user', { user }).pipe(
      map((response) => {
        this._user.next(response);
      }),
    );
  }

  signInUsingToken(token: string) {
    const params = new HttpParams()
      .append('skipErrorMessage', true)
      .append('showLoader', true);

    return this.httpClient.post<{ token: string; id: string }>(
      '/auth/refresh-token',
      { token },
      { params },
    );
  }
}
