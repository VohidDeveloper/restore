import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ACCESS_TOKEN_KEY } from 'shared/constants';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const authService = inject(AuthService);
  const accessToken = storage.get(ACCESS_TOKEN_KEY);

  if (accessToken) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    req = req.clone({ headers, url: req.url });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate([]);
      }
      return throwError(() => error);
    }),
  );
};
