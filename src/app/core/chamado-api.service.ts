import { Component, Injectable, Type } from '@angular/core';
import { FormService } from '../service/form.service';
import { data } from './data';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { ApiResponse, Chamado, ChamdoId, Foto, setor } from './types';

@Injectable({
  providedIn: 'root'
})
export class ChamadoApiService {
  api ='http://localhost:8080';
  constructor(private service:FormService,private http:HttpClient) { }
  registrar(data:any):Observable<data>{
    return this.http.post<data>(`${this.api}/service/card/chamado`,{titulo:'hardware',chamado:[
      data]})
  }
  pegarSetor():Observable<setor[]>{
    return this.http.get<setor[]>(`${this.api}/service/lista`).pipe();
  }

  pegarimg(file:File|any,data:any):Observable<any>{
    const formData: FormData = new FormData();
    const dataa = {
      usuario_id:1,
      usuario:data.usuario,
      itens:[
        data
      ]
    }
    const json = JSON.stringify(dataa)
    formData.append('file', file);
    formData.append("data",json)
    const headrs= new HttpHeaders();
    console.log(json)
  const resquest = new HttpRequest('POST','http://localhost:8080/chamado',formData,{reportProgress:true,responseType:'text'})
 return this.http.request(resquest);
    // return this.http.post(`${this.api}/foto`,formData,{reportProgress:true,responseType:'arraybuffer'})
  }
  pegarFoto():Observable<Foto[]>{
    return this.http.get<Foto[]>(`${this.api}/foto/lista`);
  }

  lista():Observable<ApiResponse>{
    let id = 1
    return this.http.get<ApiResponse>(`${this.api}/chamado/${id}`);
    
  }
  ChamdoId(card:string):Observable<ChamdoId>{
    let itens = `/chamado/unit/card/${card}`
    return this.http.get<ChamdoId>(`${this.api}${itens}`);
  }
}
