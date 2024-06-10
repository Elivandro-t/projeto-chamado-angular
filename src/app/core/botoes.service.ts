/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { botoes } from './types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotoesService {
  api = environment.apiUrl;
  EndPoint = `${environment.apiUrl}/lista`;
  constructor(private http: HttpClient) { }
  buscarBotoes(): Observable<botoes[]>{
    return this.http.get<botoes[]>(`${this.EndPoint}/botoes`).pipe();
  }
  buscarBotoesSea(name: string): Observable<botoes[]>{
    return this.http.get<botoes[]>(`${this.EndPoint}/search?name=${name}`).pipe();
  }
  buscarItens(id: number): Observable<botoes>{
    return this.http.get<botoes>(`${this.EndPoint}/botoes/itens/${id}`).pipe();
  }
  addSetor(name: any): Observable<any>{
    return this.http.post<any>(`${this.api}/setor`,{name});
  }
}
