import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._router.url !== 'login') {
      let token = localStorage.getItem('token');
      let currentTime = Date.now() / 1000;
      if (token) {
        try {
          let decoded = jwtDecode(token);
          if (decoded.exp && decoded.exp < currentTime) { //logout (expiré)
            this._authService.logout();
            console.error('Token expired');
          } else { //OK
            req = req.clone({
              setHeaders: {
                Authorization: localStorage.getItem('token')!
              }
            });
          }
        } catch (err) {
          console.error('Invalid token', err);
          return throwError(err); // Terminate the request
        }
      }
    }
    return next.handle(req)
  };
}
