import {  Injectable } from '@angular/core';
import { FormService } from '../service/form.service';
import { data } from './data';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { ApiResponse, ChamadoRes, ChamdoId, Foto, setor } from './types';

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
    return this.http.get<setor[]>(`${this.api}/lista/setor`).pipe();
  }
  // criando um chamdo 
  pegarimg(file:File|any,data:any):Observable<HttpEvent<ChamadoRes>>{
    const formData: FormData = new FormData();
    const dataa = {
      id:2,
      servico:data.titulo,
      itens:[
        data
      ]
    }
    const json = JSON.stringify(dataa)
    formData.append('file', file);
    formData.append("data",json)
    console.log(json)
  const resquest = new HttpRequest('POST','http://localhost:8080/chamado',formData,{reportProgress:true,responseType:"json"})
 return this.http.request<ChamadoRes>(resquest).pipe(
  map((e:any)=>{
    if(e instanceof HttpResponse){
      return e.body as ChamadoRes | any;
    }
    return null;
  })
 );
    // return this.http.post(`${this.api}/foto`,formData,{reportProgress:true,responseType:'arraybuffer'})
  }
  pegarFoto():Observable<Foto[]>{
    return this.http.get<Foto[]>(`${this.api}/foto/lista`);
  }
  // listando os chamados de usuario por usuario

  lista():Observable<ApiResponse>{
    let id = 1
    return this.http.get<ApiResponse>(`${this.api}/chamado/${id}?size=10`);
  }
  //pegando chamdo por id
  ChamadoId(card:string,id:number):Observable<ChamdoId>{
    let itens = `/chamado/card/${card}/${id}`
    return this.http.get<ChamdoId>(`${this.api}${itens}`);
  }
  ListaAdm(page:number):Observable<ApiResponse>{
    console.log(page)
    return this.http.get<ApiResponse>(`${this.api}/lista?size=2&page=${page}`)
  }
  PegarTec(idItens:number,IdIChamado:number):Observable<ChamadoRes>{
    const data = {
      id:idItens,
      tecnicoid:1,
	    tecnico_responsavel:"fulano"
    }
    const dados = JSON.stringify(data)
    console.log(dados)
    return this.http.put<ChamadoRes>(`${this.api}/chamado/ativo/${IdIChamado}`,data);
  }
}
