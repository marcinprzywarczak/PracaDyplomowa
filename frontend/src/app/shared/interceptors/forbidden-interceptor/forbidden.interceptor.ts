import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginService } from '../../services/login/login.service';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private ngxPermissionsService: NgxPermissionsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 403) {
          this.loginService
            .getUserPermissions()
            .pipe(
              finalize(() => {
                this.router.navigate(['/brak-dostepu']);
              })
            )
            .subscribe({
              next: (result) => {
                const permissions = result.permissions.map((x: any) => {
                  return x.name;
                });
                this.ngxPermissionsService.loadPermissions(permissions);
                localStorage.setItem(
                  'app.permissions',
                  JSON.stringify(permissions)
                );
              },
            });
        }
        return throwError(err);
      })
    );
  }
}
