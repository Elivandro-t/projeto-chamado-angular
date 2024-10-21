import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timeout, map, catchError, of } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class Conect{
    constructor(private http: HttpClient) {}

  checkConnectivity(url: string, timeoutMs: number = 10000): Observable<boolean> {
    return this.http.get(url, { responseType: "text" }).pipe(
      timeout(timeoutMs), // Define um limite de tempo para a resposta
      map(() => true), // Se a requisição for bem-sucedida
      catchError(() => of(false)) // Se houver qualquer erro (timeout, falha HTTP), retorna false
    );
  }
}