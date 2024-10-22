import {  CanActivate, Router} from '@angular/router';
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { InternetErroComponent } from '../../Home/shared/ConexaoErro/internet-erro/internet-erro.component';
import { map, Observable } from 'rxjs';
import { Conect } from './Conect.service';

@Injectable({
    providedIn:"root"
})
export class ConexaoActive implements CanActivate{
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private connectivityService: Conect // Injeta o serviço de conectividade
      ) {}
    
      canActivate(): Observable<boolean> | boolean {
        if (!navigator.onLine) {
          this.dialog.open(InternetErroComponent);
          return false;
        } else {
          return this.connectivityService.checkConnectivity("https://agileservice.onrender.com", 10000).pipe(
            map((isConnected: boolean) => {
              if (!isConnected) {
                this.dialog.open(InternetErroComponent);
              }
              return isConnected;
            })
          );
        }
      }

}