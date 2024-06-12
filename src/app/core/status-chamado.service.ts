/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusChamadoService {
  api = `${environment.apiUrl}/chamado`;
  constructor(private http: HttpClient,private user: UserAuthService) { }

  mudaStatus(usuarioId: number,chamadoID: string): Observable<any>{
    const endPoint = `/concluido/${usuarioId}/chamadoCard/${chamadoID}/${this.user.getId()}`;
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }

  mudaStatusReabrir(usuarioId: number,chamadoID: string): Observable<any>{
    const endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/aberto/${this.user.getId()}`;
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  mudaStatusJira(usuarioId: number,chamadoID: string): Observable<any>{
    const endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/jira/${this.user.getId()}`;
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  mudaStatusaprovador(usuarioId: number,chamadoID: string): Observable<any>{
    const endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/aprovador/${this.user.getId()}`;
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  mudaStatusFechado(usuarioId: number,chamadoID: string): Observable<any>{
    const endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/fechado/${this.user.getId()}`;
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  mudaStatusRecusado(usuarioId: number,chamadoID: string): Observable<any>{
    const endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/recusado/${this.user.getId()}`;
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  OneStatus(usuarioId: number, chamadoID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/lista/status/service/${usuarioId}/${chamadoID}`).pipe();
  }
  
}
