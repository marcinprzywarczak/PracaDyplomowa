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
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 419) {
          this.loginService.csrf().subscribe(() => {
            this.loginService.logout().subscribe(() => {
              localStorage.removeItem('isLogged');
              window.location.href = '/login';
            });
          });

          // this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}
