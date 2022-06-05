import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  token: string = '';

  getRawToken(): string {
    this.auth.idTokenClaims$.subscribe((claims) => {
      let tokenClaims = JSON.stringify(claims, null, 2);
      this.token = tokenClaims.split('"__raw":')[1].split('"')[1];
    });
    return this.token;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getRawToken()}`,
      },
    });

    return next.handle(request);
  }
}
