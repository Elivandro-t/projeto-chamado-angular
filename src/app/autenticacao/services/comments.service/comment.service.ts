/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comment, commentRegiste } from './commentType';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
   api = environment.apiUrl;
  constructor(private http: HttpClient) { }
  RegistroComment(chamadoid: number,data: commentRegiste,files: File[]): Observable<HttpEvent<commentRegiste>>{
    const formData: FormData = new FormData();
    const chamdo ={chamadoid,itens:[
      data
  ]};
  const json = JSON.stringify(chamdo);
    formData.append("data", json);
    if (files !== null) {
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append('file', file);
        }
      }

    }
   
    console.log(formData);
   
    const resquest = new HttpRequest('POST', `${this.api}/comment`, formData, { reportProgress: true, responseType: "json" });
    return this.http.request<any>(resquest).pipe();
  }
  comment(chamadoId: number): Observable<comment>{
    return this.http.get<comment>(`${this.api}/comment/lista/${chamadoId}`) .pipe(
      
    );
  }
}
