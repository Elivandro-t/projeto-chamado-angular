/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { ApiWhatsapp } from "../../../autenticacao/services/apiwhatsapp.service";
import { data } from "../../../core/data";

@Injectable({
    providedIn: 'root'
  })
  export class EnvioDeMesagemWhats{

    constructor(private zap: ApiWhatsapp){}
    data(): string{
      const agora = new Date();
      const hora = agora.getHours();

      if (hora < 12) {
          return "Bom dia!";
      } else if (hora < 18) {
          return "Boa tarde!";
      } else {
          return "Boa noite!";
      }
    }
    PegarMsg(contato: any,usuario: any,servico: any, card: any, usuarioId: any, id_chamado: any){
        const commentValue = `*${this.data()} ${usuario}, tudo bem*? Sou o assistente virtual da TI 👍

Estou passando para informar que um novo chamado foi aberto solicitando suporte *${servico}*!

Acompanhe pelo portal todo o processo da sua solicitação.

Caso tenha alguma dúvida, entre em contato.

🔔 Clique abaixo e acesse seu link de acesso ao nosso portal: ⬇
https://suporteinformatic.com.br/chamado/${card}/${usuarioId}/${id_chamado}/create

🔴

#INFORMATICA CD 116`;
              this.zap.pegar(55 + contato, commentValue).subscribe((e) => {
                console.log(e);
              });
    }
  }