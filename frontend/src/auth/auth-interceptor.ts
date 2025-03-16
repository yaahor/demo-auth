import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getToken();

  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next(clonedRequest);
  }

  return next(req);
}
