/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { ApiWhatsapp } from "../../../autenticacao/services/apiwhatsapp.service";

@Injectable({
    providedIn: 'root'
  })
  export class CommentZap{
    constructor(private zap: ApiWhatsapp){}
    PegarMsg(contato: any,msg: any){
              this.zap.pegar(55 + contato, msg).subscribe((e) => {
                console.log("erro "+e);
               
              });
    }
  }