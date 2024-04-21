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
  constructor(
    private _authService: AuthService,
    private messageService: MessageService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const skipErrorMessage = request.params.get('skipErrorMessage');
    const params = request.params.delete('skipErrorMessage');

    return next.handle(request.clone({ params })).pipe(
      catchError((error) => {
        // Server  down
        if (error instanceof HttpErrorResponse && error.status === 0) {
          const message =
            'Le serveur est actuellement inaccessible. Veuillez réessayer plus tard.';

          this.showError(message);
          return throwError(() => error);
        }

        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this._authService.signOut();
        }

        if (!skipErrorMessage) {
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
    });
  }
}
