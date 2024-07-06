/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn:"root"
})
export class EsqueceuSenhaService{
    email!: string;
    api=environment.apiUrl;
    constructor(private http: HttpClient){}
    Send(email: any): Observable<any>{
        console.log("meu email "+ email);
        return this.http.put<any>(`${this.api}/alterar/cod/${email}`,{}).pipe();
    }
    Verificar(email: any,codigo: any): Observable<any>{
        return this.http.post<any>(`${this.api}/varificacao/code`,{email,codigo}).pipe();
    }
    alterPasswd(email: any,newPassword: any): Observable<any>{
        return this.http.put<any>(`${this.api}/alterar/passwd`,{email,newPassword}).pipe();
    }
    salvarEmail(data: any){
        return this.email = data;
    }
}