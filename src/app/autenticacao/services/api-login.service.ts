/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UserAuthService } from '../../core/user-auth.service';
import { environment } from '../../../environments/environment';
import { token } from '../types/token';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  public $refreshtoken = new Subject<boolean>;
  endoint = environment.apiUrl;
  constructor(private http: HttpClient, private logued: UserAuthService, private router: Router) {
    this.$refreshtoken.subscribe((res: any) => {
      if (res) {
        this.refreshtokenApi();

      }

    });
  }
  login(data: any): Observable<token> {
    return this.http.post<token>(`${this.endoint}/login`, data).pipe(
      tap(response => {
        this.logued.setToken(response);
      })
    );
  }
  Signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.endoint}/registrar`, data).pipe();
  }
  UpdateUser(data: any): Observable<any> {
    return this.http.put<any>(`${this.endoint}/usuario/update`, data).pipe();
  }
  refreshtokenApi() {
    const token = localStorage.getItem("refreshtoken");
    this.http.post<any>(`${this.endoint}/refreshToken`, { refreshtoken: token }).subscribe(res => {

      if (res.token) {
        localStorage.setItem("acesstoken", res.token);
        this.logued.setToken(res.token);
        setTimeout(()=>{
          window.location.reload();
        },100);

      }


    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  

}
