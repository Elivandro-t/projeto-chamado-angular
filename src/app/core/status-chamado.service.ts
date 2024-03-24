import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusChamadoService {
  api = "http://localhost:8080/chamado";
  constructor(private http:HttpClient) { }

  mudaStatus(usuarioId:number,chamadoID:number):Observable<any>{
    let endPoint = `/concluido/${usuarioId}/chamadoid/${chamadoID}`
      return this.http.put<any>(this.api+endPoint,{}).pipe();
  }
}
