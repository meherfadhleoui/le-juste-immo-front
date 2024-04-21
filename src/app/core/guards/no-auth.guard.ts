import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { of, switchMap } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const router = inject(Router);

  return _authService.check().pipe(
    switchMap((isAthenticated) => {
      if (!isAthenticated) {
        return of(true);
      }

      router.navigate(['/home']);
      return of(false);
    }),
  );
};
