import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 404) {
          // window.location.href = '/nie-znaleziono';
          this.router.navigate(['/nie-znaleziono']);
        }
        return throwError(err);
      })
    );
  }
}
