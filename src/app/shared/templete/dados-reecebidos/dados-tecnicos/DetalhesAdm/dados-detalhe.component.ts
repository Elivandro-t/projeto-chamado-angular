import { SnackBar } from './../../../../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAuthService } from './../../../../../core/user-auth.service';
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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
        ImagensComponent
        
        
    ]
})
export class DadosDetalheComponent implements OnInit {

  ocultar: boolean = false;
  titulo: "Mostrar"|"Ocultar"="Mostrar";
  foto: any;
  chamdoCard: any;
  id: any;
  user: string="admin";
  desable: boolean = false;
  desableButton: boolean = false;
  showModal: boolean = false;
  FotoName!: string;
  showDownloadButtons: boolean = false;
 cardid: any;
 idchamdo: any;
 card: any;
 
  constructor(private api: LogServiceService,private SnackBar: SnackBar,private sanitizer: DomSanitizer,private service: ChamadoApiService,private http: HttpClient,private rout: Router,private route: ActivatedRoute,public auth: UserAuthService){}
  ngOnInit(): void {
      this.card = this.route.snapshot.paramMap.get("card") as string;
      this.cardid = this.route.snapshot.paramMap.get("cardid") as string;

     this.idchamdo = this.route.snapshot.paramMap.get("id") as any;
     this.ColetarIfor();
    this.service.ChamadoId(this.card,this.idchamdo).subscribe(e=>{
      new Promise(()=>{
        this.chamdoCard = e;
          this.foto = e.itens;
      });
    });
    
  }

pegart(idchamdo: any){

 return new Promise((resolve)=>{
    resolve(
    this.service.PegarTec(idchamdo,this.chamdoCard.id).subscribe((e: any) => {
     this.SnackBar.openSnackBar(e.msg);
     this.ngOnInit();
    })
  );
  });

}

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
      this.showModal= true;
      document.body.classList.remove("modal-open");
    }
    close() {
    this.showModal = false;
    document.body.classList.remove("modal-open");
    }

  ocults(){
    this.ocultar=!this.ocultar;
    switch(this.ocultar){
      case true:
       return  this.titulo="Ocultar";
      case false:
        return  this.titulo = "Mostrar";
    }
  }
  showButtons() {
    this.showDownloadButtons = true;
    setTimeout(() => {
      this.showDownloadButtons = false;
    },10000); // Esconde os botões após 2 segundos sem movimento do mouse
  }
  //logs usuarios
  ColetarIfor(){

    this.pegarLog(this.cardid,`Visualizado por <p style="color: rgb(90, 88, 230);">${this.auth.getname()}</p> card: ${this.card}`);
  }
  pegarLog(chamadoId: any,cardId: any){
    this.api.apiLog(chamadoId,cardId).subscribe();
  }
  buscar(){
    this.pegarLog(this.cardid,`<div style="color:green;">Chamado aceito por <p style="color: rgb(90, 88, 230);">${this.auth.getname()}</p> card: ${this.card} </div>`);
  }
  


}
