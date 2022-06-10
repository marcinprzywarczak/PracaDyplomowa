import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpXsrfTokenExtractor,
  HttpErrorResponse,
  HttpStatusCode,
  HttpClient,
} from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  headerName = 'X-XSRF-TOKEN';

  constructor(
    private tokenService: HttpXsrfTokenExtractor,
    private router: Router,
    private http: HttpClient
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET' || req.method === 'HEAD') {
      return next.handle(req);
    }
    //this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe();
    const token = this.tokenService.getToken();

    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({ headers: req.headers.set(this.headerName, token) });
    }
    return next.handle(req);
  }
}
