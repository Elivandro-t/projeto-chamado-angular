/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BuscaService } from './busca.service';
import { Injectable } from '@angular/core';
import { data } from './data';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { ApiResponse, ChamadoRes, ChamdoId, Foto, setor } from './types';
import { Auth } from '../autenticacao/auth/Auth.service';
import { UserAuthService } from './user-auth.service';
import { environment } from '../../environments/environment';
interface ativo {
  ativo: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ChamadoApiService {

  api = environment.apiUrl;
  id: any;
  constructor(private busca: BuscaService, private http: HttpClient, private auth: Auth, private Inforuser: UserAuthService) {
    this.id = this.Inforuser.getId();
  }
  registrar(data: any, servico: any): Observable<data> {
    return this.http.post<data>(`${this.api}/service/card/chamado`, {
      titulo: servico, chamado: [
        data]
    });
  }
  pegarSetor(): Observable<setor[]> {

    return this.http.get<setor[]>(`${this.api}/lista/setor`).pipe();
  }
  ListaEquipamento(): Observable<setor[]> {
    return this.http.get<setor[]>(`${this.api}/equipamentos/lista`).pipe();
  }
  // criando um chamdo 
  pegarimg(id: number, files: File[] | any, data: any): Observable<HttpEvent<ChamadoRes>> {
    const formData: FormData = new FormData();
    const Response = {
      id: id,
      usuarioid: this.Inforuser.getId(),
      filial: this.Inforuser.getFilial(),
      servico: data.titulo,
      itens: [
        data
      ]
    };
    const json = JSON.stringify(Response);
    formData.append("data", json);
    if (files !== null) {
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append('file', file);
        }
      }

    }
    const resquest = new HttpRequest('POST', `${this.api}/chamado`, formData, { reportProgress: true, responseType: "json" });
    return this.http.request<ChamadoRes>(resquest).pipe(
      map((e: any) => {
        if (e instanceof HttpResponse) {
          return e.body as ChamadoRes | any;
        }
        return null;
      })
    );
  }
  pegarFoto(): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${this.api}/foto/lista`);
  }
  // listando os chamados de usuario por usuario

  lista(page: any,size: any,ativo: any): Observable<ApiResponse> {
    let params = new HttpParams();
    const search: string = this.busca.form.value.search ?? '';
    if (ativo !== null && ativo !== undefined) {
      params = params.set("ativo", ativo);
    }
   if(search!=null&&search!=undefined){
    params = params.set('descricao', search);
   }
   if (page !== null && page !== undefined) {
    params = params.set("page", page);

  }
  if (size !== null && size !== undefined) {
    params = params.set("size", size);

  }
  if(this.Inforuser.getId()!=null||this.Inforuser.getId()!=undefined){
    return this.http.get<ApiResponse>(`${this.api}/chamado/usuarioid/${this.Inforuser.getId()}`, { params });

  }

return null as any;

  }
  //pegando chamdo por id
  ChamadoId(card: string, id: number): Observable<ChamdoId> {
    const itens = `/chamado/card/${card}/${id}`;
    return this.http.get<ChamdoId>(`${this.api}${itens}`);
  }
  ListaAdm(page: number, ativo: any,dataAntes: any,dataDepois: any,size: any): Observable<ApiResponse> {
    const setor = this.busca.form.value.search as any;
    let params = new HttpParams();
    if (ativo !== null && ativo !== undefined) {
      params = params.set("ativo", ativo);
    }
    if (setor !== null && setor !== undefined) {
      params = params.set("setor", setor);

    }
    if (dataAntes !== null && dataAntes !== undefined) {
      params = params.set("dataAntes", dataAntes);

    }
    if (dataDepois !== null && dataDepois !== undefined) {
      params = params.set("dataDepois", dataDepois);

    }
    if (page !== null && page !== undefined) {
      params = params.set("page", page);

    }
    if (size !== null && size !== undefined) {
      params = params.set("size", size);

    }
    return this.http.get<ApiResponse>(`${this.api}/lista/${this.Inforuser.getFilial()}`, { params });
  }
  
  // buscando todos os chamados das filiais
  ListaAdmFiliais(page: number, ativo: any,dataAntes: any,dataDepois: any,size: any): Observable<ApiResponse> {
    const setor = this.busca.form.value.search as any;
    let params = new HttpParams();
    if (ativo !== null && ativo !== undefined) {
      params = params.set("ativo", ativo);
    }
    if (setor !== null && setor !== undefined) {
      params = params.set("setor", setor);

    }
    if (dataAntes !== null && dataAntes !== undefined) {
      params = params.set("dataAntes", dataAntes);

    }
    if (dataDepois !== null && dataDepois !== undefined) {
      params = params.set("dataDepois", dataDepois);

    }
    if (page !== null && page !== undefined) {
      params = params.set("page", page);

    }
    if (size !== null && size !== undefined) {
      params = params.set("size", size);

    }
    return this.http.get<ApiResponse>(`${this.api}/lista/filiais/cds`, { params });
  }
  ListaTecnico(page: number,size: number): Observable<ApiResponse> {
    const setor = this.busca.form.value.search as any;
    let params = new HttpParams();
    // if (ativo !== null && ativo !== undefined) {
    //   params = params.set("ativo", ativo);
    // }
    // if (setor !== null && setor !== undefined) {
    //   params = params.set("setor", setor);

    // }
    // if (dataAntes !== null && dataAntes !== undefined) {
    //   params = params.set("dataAntes", dataAntes);

    // }
    // if (dataDepois !== null && dataDepois !== undefined) {
    //   params = params.set("dataDepois", dataDepois);

    // }
  
    return this.http.get<ApiResponse>(`${this.api}/chamado/tecnico/${this.id}?size=${size}&page=${page}`);
  }
  
  PegarTec(idCard: number, idItens: number): Observable<ChamadoRes> {
    const data = {
      id: idCard,
      tecnicoid: this.Inforuser.getId(),
      tecnico_responsavel: this.Inforuser.getname()
    };
    return this.http.put<ChamadoRes>(`${this.api}/chamado/ativo/${idItens}`, data);
  }
  listaAguardandoValidacao(): Observable<ApiResponse> {
    const params = new HttpParams();
    const search: string = this.busca.form.value.search ?? '';

    params.set('setor', search);

    return this.http.get<ApiResponse>(`${this.api}/lista/aguardando/${this.Inforuser.getId()}?size=5`);
  }

}
