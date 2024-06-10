/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Auth } from '../autenticacao/auth/Auth.service';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userSubject = new BehaviorSubject<any|null>(null);
  constructor(private AuthToken: Auth) { 
    if(AuthToken.PossuiToken()){
      this.decode();
    }
  }
  decode(){
    const token = this.AuthToken.returnToken();
    const user = jwtDecode(token as any) as any;
    this.userSubject.next(user);
  }
  getRole(){
    let role;
    this.retornUser().subscribe(e=>{
      if(e && e.perfil !== null){
        role = e.perfil;
      }
    });
    return role;
  }
  getFilial(){
    let filial;
    this.retornUser().subscribe(e=>{
      filial = e.filial;
    });
    return filial as any;
  }
  getEmail(){
    let role;
    this.retornUser().subscribe(e=>{
      role = e.sub;
    });
    return role;
  }
  getId(){
    let ids;
    this.retornUser().subscribe(e=>{
      if(e && e.id!==null){
        ids = e.id;
      }
    });
    return ids as unknown as any;
  }
  retunToken(){
    return this.AuthToken.returnToken;
  }
  retunRefreshToken(){
    return this.AuthToken.returnRefreshToken();
  }
  getname(){
    let name;
    this.retornUser().subscribe(e=>{
      name = e.name;
    });
    return name;
  }
  getimage(){
    
    return localStorage.getItem("image");
  }
  retornUser(){
    return  this.userSubject.asObservable();
  }
  setToken(data: any){
   if(data.token!=null){
    this.AuthToken.recebiToken(data.token,data.refreshtoken);
    this.decode();
    return;
   }
  }
  removeToken(){
    this.AuthToken.RemoveToken();
    this.userSubject.next(null);
    return;
  }
  removeRefreshToken(){
    this.AuthToken.RemoveRefreshToken();
    this.userSubject.next(null);
    return;
  }
  isLogout(){
    return this.AuthToken.PossuiToken();
  }

  isExpirad(token: string): boolean{
   const tokens = jwtDecode(token) as any;
   const validators: any = Math.floor(Date.now()/1000);
   const time = tokens.exp - validators;
   const timehous = 2*60*60;
   return time<timehous;
  }
}
