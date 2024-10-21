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
import { ConfirmComponent } from "../../../components/AlertAtivo/Confirm.component";
import { AlertaDialogLoginServiceComponent } from "../../../AlertaDialog/alerta-dialog-login/alerta-dialog-login-service.component";

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
  constructor(private snackBar: SnackbarService, private auth: Auth, private authApi: ApiLoginService, private router: Router, private User: UserAuthService, private dialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.returnRefreshToken() ?? '';
    if (this.auth.PossuiToken() && !request.url.includes('/refreshToken')) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.returnToken()}`,
          'apikey':'9mjTJ46uD6cNDCCY8jbvzyMONBR75Xel'
        }
      });
    }
   

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500 ) {
          this.authApi.$refreshtoken.next(true);

              // this.dialog.open(ConfirmComponent);
        }
        if (error.status === 401) {
          this.router.navigate(["/cards"]);
          this.auth.RemoveToken();
          this.auth.RemoveRefreshToken();
        }
        if(error.status === 400){
          this.snackBar.openSnackBar(error.error.msg);

        }
        if (error.status === 501) {
          this.snackBar.openSnackBar("Erro 501 serviço em manutenção");
        }
        else if (error.status === 502) {
          this.snackBar.openSnackBar("Erro 502 Bad Gateway");
        }
        else if (error.status === 503) {
          this.snackBar.openSnackBar("Erro 503 serviço indisponivel");
        }
        else if (error.status === 504) {
          this.snackBar.openSnackBar("Gateway Timeout: Erro 504 serviço em manutenção");
        }
        return throwError(error.message);
      })
    );
  }
}
