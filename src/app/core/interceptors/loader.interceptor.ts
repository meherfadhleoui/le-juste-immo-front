import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private _loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const showLoader = request.params.get('showLoader');

    if (!showLoader) {
      return next.handle(request);
    }

    this.totalRequests++;
    this._loaderService.showLoader();
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this._loaderService.hideLoader();
        }
      }),
    );
  }
}
