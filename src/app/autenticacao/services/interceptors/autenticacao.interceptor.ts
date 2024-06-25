/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable, catchError, throwError } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserAuthService } from "../../../core/user-auth.service";
import { Auth } from "../../auth/Auth.service";
import { ApiLoginService } from "../api-login.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../../core/snackbar.service";

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
  constructor(private snackBar: SnackbarService, private auth: Auth, private authApi: ApiLoginService, private router: Router, private User: UserAuthService, private dialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.returnRefreshToken() ?? '';
    if (this.auth.PossuiToken() && !request.url.includes('/refreshToken')) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.returnToken()}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500 ) {
              const isToken = confirm("Sessão expirada! deseja continuar?");
            if (isToken) {
              this.authApi.$refreshtoken.next(true);
            } 
        }
        if (error.status === 401) {
          this.router.navigate(["/auth/login"]);
          this.auth.RemoveToken();
          this.auth.RemoveRefreshToken();
        }
        // if (error.status === 400) {
        //   this.snackBar.openSnackBar(error.error.msg);
        // }
        // if (error.status === 502) {
        //   this.snackBar.openSnackBar(error.message);
        // }
        if (error.status === 501) {
          this.snackBar.openSnackBar("Erro 501 serviço em manutenção");
        }
        // if (error.status === 503) {
        //   this.snackBar.openSnackBar(error.message);
        // }
        return throwError(error.message);
      })
    );
  }
}
