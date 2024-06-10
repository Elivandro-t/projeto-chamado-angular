import { HttpClient } from '@angular/common/http';
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
  RegistroComment(chamadoid: number,data: commentRegiste): Observable<commentRegiste>{
    console.log("data "+chamadoid);
    return this.http.post<commentRegiste>(`${this.api}/comment`,{chamadoid,itens:[
        data
    ]});  
  }
  comment(chamadoId: number): Observable<comment>{
    return this.http.get<comment>(`${this.api}/comment/lista/${chamadoId}`) .pipe(
    );
  }
}
