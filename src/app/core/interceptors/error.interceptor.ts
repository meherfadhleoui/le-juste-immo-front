import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  skipedApis = ['account_confirmation'];

  constructor(
    private _authService: AuthService,
    private messageService: MessageService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        // TODO
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this._authService.signOut();
        }

        const skipRenderError = this.skipedApis.find((skipedApi) =>
          request.url.includes(skipedApi),
        );

        if (!skipRenderError) {
          this.showError(error.error.message);
        }

        return throwError(() => error);
      }),
    );
  }

  showError(error: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: error,
      sticky: true,
    });
  }
}
