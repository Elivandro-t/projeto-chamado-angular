// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { Auth } from '../../auth/Auth.service';
// import { Router } from '@angular/router';
// import { SnackbarService } from '../../../core/snackbar.service';
// import { ApiLoginService } from '../api-login.service';

// @Injectable()
// export class AuthInterceptorsReflesh implements HttpInterceptor {
//   constructor(
//     private snackBar: SnackbarService,
//     private auth: Auth,
//     private apiLoginService: ApiLoginService,
//     private router: Router
//   ) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     let token = this.auth.returnToken() ?? '';
//     if (this.auth.PossuiToken()) {
//       request = request.clone({
//         setHeaders: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(request).pipe(
//       catchError((error: any) => {
//         if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
//           const refreshToken = this.auth.returnRefreshToken();
//           if (!refreshToken) {
//             // Se não houver refreshToken disponível, redireciona para a página de login
//             this.snackBar.openSnackBar("Sessão expirada!");
//             this.auth.RemoveToken();
//             this.auth.RemoveRefreshToken();
//             this.router.navigate(["/login"]);
//             return throwError("Sem token disponível");
//           }

//           // Se houver refreshToken disponível, tenta atualizar o token
//           return this.apiLoginService.refreshtokenApi(refreshToken).pipe(
//             switchMap((response: any) => {
//               const newToken = response.token;
//               // Salva o novo token no localstorage
//               localStorage.setItem("newToken", newToken);
//               this.snackBar.openSnackBar("Token atualizado!");
//               // Atualiza o cabeçalho da solicitação original com o novo token
//               const newRequest = request.clone({
//                 setHeaders: {
//                   'Authorization': `Bearer ${newToken}`
//                 }
//               });
//               // Reenvia a solicitação original com o novo token
//               return next.handle(newRequest);
//             }),
//             catchError((erro: any) => {
//               this.snackBar.openSnackBar("Sessão expirada!");
//               this.auth.RemoveToken();
//               this.auth.RemoveRefreshToken();
//               this.router.navigate(["/login"]);
//               return throwError(erro);
//             })
//           );
//         } else if (error instanceof HttpErrorResponse && error.status === 500) {
//           // Se o erro for um erro de servidor (status 500), tente atualizar o token
//           const refreshToken = this.auth.returnRefreshToken();
//           if (refreshToken) {
//             return this.apiLoginService.refreshtokenApi(refreshToken).pipe(
//               switchMap((response: any) => {
//                 const newToken = response.token;
//                 // Salva o novo token no localstorage
//                 localStorage.setItem("token", newToken);
//                 this.snackBar.openSnackBar("Token atualizado após erro 500!");
//                 // Atualiza o cabeçalho da solicitação original com o novo token
//                 const newRequest = request.clone({
//                   setHeaders: {
//                     'Authorization': `Bearer ${newToken}`
//                   }
//                 });
//                 // Reenvia a solicitação original com o novo token
//                 return next.handle(newRequest);
//               }),
//               catchError((erro: any) => {
//                 this.snackBar.openSnackBar("Erro ao atualizar token após erro 500!");
//                 return throwError(erro);
//               })
//             );
//           }
//         }

//         return throwError(error);
//       })
//     );
//   }
// }
