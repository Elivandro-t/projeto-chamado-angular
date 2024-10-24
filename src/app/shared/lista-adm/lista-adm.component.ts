import { SnackBar } from './../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { ApiResponse, Chamados } from '../../core/types';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertaDialogServiceComponent } from '../../AlertaDialog/alerta-dialog-service/alerta-dialog-service.component';
import { AcitiveModule } from '../../core/activete.module';
import { BuscaService } from '../../core/busca.service';
import e from 'express';
import { Subscription } from 'rxjs';
import { LogServiceService } from '../../core/log-service.service';
import { UserAuthService } from '../../core/user-auth.service';
interface ativo {
  ativo: boolean;
}
@Component({
  selector: 'app-lista-adm',
  standalone: true,
  imports: [ListaChamadoComponent, AcitiveModule],
  templateUrl: './lista-adm.component.html',
  styleUrl: './lista-adm.component.scss'
})
export class ListaAdmComponent implements OnInit, OnDestroy {
 datauser: any;
  displayedColumns = ['Card', 'Ref', 'Status', 'Setor', 'Solicitante', 'Data de criação', 'Atendente'];
  dataSouce!: Chamados[];
  number!: number;
  totalPages!: number;
  itens!: any;
  ativo!: boolean;
  minhaSubscription: Subscription | undefined;
  numberOfPages: any;
  size = 10;
  constructor(private api: LogServiceService,private service: ChamadoApiService, public busca: BuscaService, private snackBar: SnackBar, private dialog: MatDialog,private user: UserAuthService) { }

  ngOnInit(): void {
    this.ativo = true;
    this.busca.form.reset();
    this.gerar();
  }
  gerarativo(event: boolean) {
    this.ativo = event;
    this.gerar();
  }
  emitsize(event: any){
    this.size =event.target.value;
  }
  gerar() {
    const data = {
      dataAntes:this.busca.form.get("dataAntes")?.value,
      dataDepois:this.busca.form.get("dataDepois")?.value
    };
    this.minhaSubscription = this.service.ListaAdm(this.totalPages, this.ativo,data.dataAntes,data.dataDepois,this.size).subscribe((e) => {
      this.dataSouce = this.transformeEmItens(e);
      this.itens = this.transformeEmIten(e);
      this.number = e.totalPages;
      this.numberOfPages = e.number;
    });
  }

  pegarLog(chamadoId: any,){
    this.datauser = chamadoId;
    this.api.apiLog(chamadoId.id,`<div style="color:green;">Chamado aceito por <p style="color: rgb(90, 88, 230);">${this.user.getname()}</p> card: ${chamadoId.cardId} </div>` ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.minhaSubscription) {
      this.minhaSubscription.unsubscribe();
    }
  }
  pegarEvent(event: number) {
    this.totalPages = event;
    this.gerar();
  }
  transformeEmItens(Itens: ApiResponse): any {
    return Itens.content.flatMap(e => e) as any;
  }
  transformeEmIten(Itens: ApiResponse): any[] {
    const itens = Itens.content.flatMap(e => e.itens) as any;
    return itens.length;
  }
  getRas(event: any, ids: any) {

    this.service.PegarTec(event.id, ids.Idchamado).subscribe((e: any) => {

      this.snackBar.openSnackBar(e.msg);
      this.ngOnInit();

    });
  }
  deleteChamado(event: any){
    this.service.DeleteChamado(event).subscribe((e: any) => {
      this.snackBar.openSnackBar(e.msg);

    });
  }
}