/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardsChamadosComponent } from '../../../../../Home/tela-home/cards/cards-chamados/cards-chamados.component';
import { ChamadoApiService } from '../../../../../core/chamado-api.service';
import { ActivatedRoute } from '@angular/router';
import { DadosTecnicosComponent } from '../botoes/dados-tecnicos.component';
import { ComentsComponent } from '../../../coments/coments.component';
import { StatusChamadoService } from '../../../../../core/status-chamado.service';
import { AlertComponent } from '../../../alerta/alert/alert.component';
import { MuralPricipalComponent } from '../../../../../components/mural/mural-pricipal/mural-pricipal.component';
import { MuralComponent } from '../../../../../components/mural-secundary/mural.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserAuthService } from '../../../../../core/user-auth.service';
import { ImagensComponent } from "../../imagens/imagens.component";
import { BotaoBackComponent } from '../../../../../components/botao_voltar/botaoVoltar.component';
import { SnackBar } from '../../../../../AlertaDialog/snackBar/snackbar.component';

@Component({
  selector: 'app-dados-reecebidos',
  standalone: true,
  imports: [
    ImagensComponent,
    AsyncPipe,
    DadosTecnicosComponent,
    MatAutocompleteModule,
    CommonModule,
    CardsChamadosComponent,
    MuralComponent,
    MuralPricipalComponent,
    ComentsComponent,
    AlertComponent,
    BotaoBackComponent
  ],
  templateUrl: './dados-reecebidos.component.html',
  styleUrl: './dados-reecebidos.component.scss'
})
export class DadosReecebidosComponent implements OnInit {

  ocultar: boolean = false;
  titulo: "Mostrar" | "Ocultar" = "Mostrar";
  foto: any;
  ids: any;
  user: string = "admin";
  desable: boolean = false;
  desableButton: boolean = false;
  chamdoCard: any;
  list = ["CRIACAO DE CONTA AD","RESET DE SENHA ZIMBRA","RESET DE SENHA MAESTRO","RESET DE SENHA JIRA","RESET DE CONTA AD",
    "SOLICITACAO DE PACOTE OFFICE",
    "SOLICITACAO DE VPM"
  ];
  constructor(private Snack: SnackBar, private api: ChamadoApiService, private snack: SnackBar, private sanitizer: DomSanitizer, private service: ChamadoApiService, private route: ActivatedRoute, private servicestatus: StatusChamadoService, public auth: UserAuthService) { }
  ngOnInit(): void {
    const card = this.route.snapshot.paramMap.get("card") as string;
    const id = this.route.snapshot.paramMap.get("id") as any;
    this.service.ChamadoId(card, id).subscribe(e => {
      new Promise(() => {
        this.chamdoCard = e;
        this.ids = e.id;
        this.foto = e.itens;

        switch (this.user) {
          case "admin":
            this.desable = false;
            this.desableButton = true;
            break;
          case "user":
            this.desable = true;
            break;
          default:
            break;
        }
      });

    });

  }
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ocults() {
    this.ocultar = !this.ocultar;
    switch (this.ocultar) {
      case true:
        return this.titulo = "Ocultar";
      case false:
        return this.titulo = "Mostrar";
    }
  }

  getRas(id: any, itensid: any) {

    this.api.PegarTec(id, parseInt(itensid)).subscribe((e: any) => {
      this.snack.openSnackBar(e.msg);

    });
  }
  pegart(idchamdo: any) {

    return new Promise((resolve) => {
      resolve(
        this.service.PegarTec(idchamdo, this.chamdoCard.id).subscribe((e: any) => {
          this.snack.openSnackBar(e.msg);
          this.ngOnInit();
        })
      );
    });
  }

}
