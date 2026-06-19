import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// TODO: replace with a logger or display on screen

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.error('Network error');
      }
      if (error.status >= 500) {
        console.error('Server error');
      }
      return throwError(() => error);
    })
  );
};
