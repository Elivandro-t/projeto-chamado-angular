import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusChamadoService {
  api = "http://localhost:8080/chamado";
  constructor(private http:HttpClient) { }

  mudaStatus(usuarioId:number,chamadoID:string):Observable<any>{
    let endPoint = `/concluido/${usuarioId}/chamadoCard/${chamadoID}`
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }

  mudaStatusReabrir(usuarioId:number,chamadoID:string):Observable<any>{
    let endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/aberto`
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  mudaStatusFechado(usuarioId:number,chamadoID:string):Observable<any>{
    let endPoint = `/validacao/${usuarioId}/chamadoCard/${chamadoID}/fechado`
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
  
}
