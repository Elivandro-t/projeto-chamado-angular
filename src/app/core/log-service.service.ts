/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {
 endpiont = environment.apiUrl; 
  constructor(private http: HttpClient,private user: UserAuthService) { }
  apiLog(cardId: number,msg: any): Observable<any>{
    const data =
      {
        card_id: cardId,
        name_usuario_acess:this.user.getname(),
        usuario_id:this.user.getId(),
        msg
      };
    return this.http.post<any>(`${this.endpiont}/info`,data).pipe();
  }
  listaLog(cardId: any): Observable<any>{
   return this.http.get<any>(`${this.endpiont}/logs/${cardId}`).pipe();
  }
}
