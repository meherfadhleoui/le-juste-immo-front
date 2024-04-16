import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const cloneReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this._authService.accessToken,
      ),

      url: environment.api + request.url,
    });

    return next.handle(cloneReq);
  }
}
