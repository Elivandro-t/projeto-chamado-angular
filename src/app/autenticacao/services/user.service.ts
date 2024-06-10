/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpRequest } from '@angular/common/http';
import { UserAuthService } from '../../core/user-auth.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../../core/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  api = environment.apiUrl;
  email!: string;
  id!: number;
  constructor(private user: UserAuthService,private http: HttpClient) { }
  detalheUser(): Observable<user>{
    return this.http.get<user>(`${this.api}/user/detalhes/${this.user.getId()}`);
  }
  ImgUser(file: File): Observable<any>{
     const data: FormData = new FormData();
     if(file!=null){
      data.append('file',file);
     }else{
     alert("foto nao pode ser nula");
     }
     const request = new HttpRequest('PUT',`${this.api}/foto/usuario/${this.user.getId()}`,data,{reportProgress: true, responseType: "json" });
    return this.http.request(request).pipe();
  }
  commentDelhatlhe(email: string): Observable<any>{
    return this.http.get<any>(`${this.api}/user/${email}`); 
  }
  addPerfil(email: string,role: any): Observable<any>{
    return this.http.put<any>(`${this.api}/perfil/usuario/${email}`,{name:role}); 
  }
  addCard(name: string): Observable<any>{
    return this.http.get<any>(`${this.api}/lista/btn/${name}`); 
  }
  addCardBtn(id: number,data: any): Observable<any>{
    const formdata= new FormData();
    const json = JSON.stringify(data);
  return this.http.put<any>(`${this.api}/add/btn/${id}`,data).pipe(); 
  }
  removeRole(email: any,id: number): Observable<any>{
    return this.http.delete<any>(`${this.api}/delete/${id}`,{body:{email}});
  }
  setImagem(image: any){
    localStorage.setItem("image",image);
}
}
