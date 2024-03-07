import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private readonly _router: Router) {
  }

  //todo: à revoir
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercept!");
    if (this._router.url !== 'login') {
      let token = localStorage.getItem('token');
      let currentTime = Date.now() / 1000;
      if (token) {
        try {
          let decoded = jwtDecode(token);
          if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token expired.");
            this._router.navigate(['login']);
            console.error('Token expired'); // Terminate the request
          } else {
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
