import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.openSuccessSnackbar(error.error.message);
        return next.handle(request);
      }));
  }

  openSuccessSnackbar(msg: string) {
    if (msg != null) {
      this.snackBar.open(msg, 'Fermer', {
        duration: 5000,
        verticalPosition: "top"
      });
    }else {
      this.snackBar.open("Erreur !", 'Fermer', {
        duration: 5000,
        verticalPosition: "top"
      });
    }

  }
}
