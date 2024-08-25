/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { ApiWhatsapp } from "../../../autenticacao/services/apiwhatsapp.service";

@Injectable({
    providedIn: 'root'
  })
  export class EnvioDeMesagemWhats{
    constructor(private zap: ApiWhatsapp){}
    PegarMsg(contato: any,usuario: any,servico: any, card: any, usuarioId: any, id_chamado: any){
        const commentValue = `*Olá ${usuario}, tudo bem?*  Sou o assistente virtual da TI👍

        Estou passando para avisar voce que, um novo chamado foi aberto solicitando suporte ${servico}! 
        
        Acompanhe pelo portal todo processo, até sua solicitação ser atendida.
        
        Caso tenha alguma duvida entre em contato com Suporte Ti CD-116
        
        Esse é um novo tipo de experiência e totalmente feito para você!  
        
        🔔* Clique abaixo e acesse seu link de acesso ao nosso portal ⬇
        :*
        https://suporteinformatic.com.br/chamado/${card}/${usuarioId}/${id_chamado}/create
        🔴
        
        
        #*INFORMATICA CD 116*
        
                `;
              this.zap.pegar(55 + contato, commentValue).subscribe((e) => {
                console.log(e);
              });
    }
  }