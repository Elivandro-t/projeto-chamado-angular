/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
export class ApiWhatsapp{
    api = "https://api.zapdai.dr7brazil.com/message/sendText/elivandro78";
    constructor(private http: HttpClient){}
    pegar(number: any, msg: any): Observable<any>{
       return this.http.post<any>(this.api,{
        "number":number
        ,
        "text": msg
       }
    );
    }
}