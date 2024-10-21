import { SnackBar } from './../../../../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAuthService } from './../../../../../core/user-auth.service';
import { AsyncPipe, CommonModule } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ActivatedRoute, Router } from "@angular/router";
import { ChamadoApiService } from "../../../../../core/chamado-api.service";
import { CardsChamadosComponent } from "../../../../../Home/tela-home/cards/cards-chamados/cards-chamados.component";
import { ComentsComponent } from "../../../coments/coments.component";
import { DadosTecnicosComponent } from "../botoes/dados-tecnicos.component";
import { AlertComponent } from "../../../alerta/alert/alert.component";
import { HttpClient } from "@angular/common/http";
import { ImagensComponent } from "../../imagens/imagens.component";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MuralPricipalComponent } from "../../../../../components/mural/mural-pricipal/mural-pricipal.component";
import { MuralComponent } from "../../../../../components/mural-secundary/mural.component";
import { BotaoBackComponent } from '../../../../../components/botao_voltar/botaoVoltar.component';
import { LogServiceService } from '../../../../../core/log-service.service';
import { MatIcon } from '@angular/material/icon';
import { DescricaoComponent } from '../../descricao/descricao.component';
import { SkeletonAdminComponent } from './skeleton/admin.skeleton.component';

@Component({
  selector: 'app-dados-detahe',
  standalone: true,
  templateUrl: './dados-detalhe.component.html',
  styleUrl: './dados-detalhe.component.scss',
  imports: [
    AsyncPipe,
    BotaoBackComponent,
    DadosTecnicosComponent,
    MatAutocompleteModule,
    CommonModule,
    CardsChamadosComponent,
    MuralComponent,
    MuralPricipalComponent,
    ComentsComponent,
    AlertComponent,
    MatIcon,
    DescricaoComponent,
    SkeletonAdminComponent


  ]
})
export class DadosDetalheComponent implements AfterViewInit {

  ocultar: boolean = true;
  foto: any;
  chamdoCard: any;
  id: any;
  user: string = "admin";
  desable: boolean = false;
  desableButton: boolean = false;
  showModal: boolean = false;
  FotoName!: string;
  showDownloadButtons: boolean = false;
  cardid: any;
  idchamdo: any;
  card: any;
  contatos!: any;
  telefoneOriginal!: any;
  loading = false;

  constructor(private api: LogServiceService, private SnackBar: SnackBar, private service: ChamadoApiService, private http: HttpClient, private rout: Router, private route: ActivatedRoute, public auth: UserAuthService) { }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.loading = true;

    }, 5000);
    this.card = this.route.snapshot.paramMap.get("card") as string;
    this.cardid = this.route.snapshot.paramMap.get("cardid") as string;

    this.idchamdo = this.route.snapshot.paramMap.get("id") as any;
    this.ColetarIfor();
    this.service.ChamadoId(this.card, this.idchamdo).subscribe(e => {

      this.chamdoCard = e;
      this.foto = e.itens;
      this.contatos = e.contato;
      this.telefoneOriginal = e.contato;

    });

   

  }

  pegart(idchamdo: any) {

    return new Promise((resolve) => {
      resolve(
        this.service.PegarTec(idchamdo, this.chamdoCard.id).subscribe((e: any) => {
          this.SnackBar.openSnackBar(e.msg);
          this.ngAfterViewInit();
        })
      );
    });

  }

  contato() {
    const url = `https://web.whatsapp.com/send?phone=${this.contatos}`;
    window.open(url, "_blank");
  }
  navigar(arg0: string) {
    this.http.get(arg0, { responseType: 'blob' }).subscribe((res: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(res);
      downloadLink.download = 'photo.jpg';
      downloadLink.click();
    }
    );
  }
  showFullScreen(arg0: string) {
    this.FotoName = arg0;
    this.showModal = true;
    document.body.classList.remove("modal-open");
  }
  close() {
    this.showModal = false;
    document.body.classList.remove("modal-open");
  }
  showButtons() {
    this.showDownloadButtons = true;
    setTimeout(() => {
      this.showDownloadButtons = false;
    }, 10000); // Esconde os botões após 2 segundos sem movimento do mouse
  }
  //logs usuarios
  ColetarIfor() {

    this.pegarLog(this.cardid, `Visualizado por <p style="color: rgb(90, 88, 230);">${this.auth.getname()}</p> card: ${this.card}`);
  }
  pegarLog(chamadoId: any, cardId: any) {
    this.api.apiLog(chamadoId, cardId).subscribe();
  }
  buscar() {
    this.pegarLog(this.cardid, `<div style="color:green;">Chamado aceito por <p style="color: rgb(90, 88, 230);">${this.auth.getname()}</p> card: ${this.card} </div>`);
  }



}
