import {  CanActivate, Router} from '@angular/router';
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { InternetErroComponent } from '../../Home/shared/ConexaoErro/internet-erro/internet-erro.component';

@Injectable({
    providedIn:"root"
})
export class ConexaoActive implements CanActivate{
    constructor(private router: Router,private dialo: MatDialog) {}
   canActivate( ): boolean{
    if(navigator.onLine){
        return true;
    }else{
        // this.router.navigate(["/log"]);
        this.dialo.open(InternetErroComponent);
        return false;
    }
       
   }

}