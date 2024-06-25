/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StatusChamadoService } from '../../../../../core/status-chamado.service';
import { ActivatedRoute } from '@angular/router';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBar } from '../../../../../AlertaDialog/snackBar/snackbar.component';
import { ChamadoApiService } from '../../../../../core/chamado-api.service';
import { UserAuthService } from '../../../../../core/user-auth.service';
import { LogServiceService } from '../../../../../core/log-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DropComponent } from '../../../campos/drop/drop.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SelectComponet } from '../../../coments/Select/select.component';

@Component({
  selector: 'app-dados-tecnicos',
  standalone: true,
  imports: [SelectComponet,MatFormFieldModule,MatSelectModule,MatInputModule,FormsModule,MatButtonModule, MatSnackBarModule, CommonModule, NgxLoadingButtonsModule, DropComponent],
  templateUrl: './dados-tecnicos.component.html',
  styleUrl: './dados-tecnicos.component.scss'
})
export class DadosTecnicosComponent implements OnInit {
  atua() {
    throw new Error('Method not implemented.');
  }
  AtualizacaoStatus = [
    { "status": "validacao", "name": "Solicitar validação" },
    { "status": "liberar", "name": "Liberar chamado" },
    { "status": "jira", "name": "Aguardando Jira" },
    { "status": "aprovador", "name": "Aguardando aprovador" },
    { "status": "fechar", "name": "Fechar" },
    { "status": "recusar", "name": "Recusar" }];
  @Output() Status: EventEmitter<any> = new EventEmitter();
  @Output() Pegartect: EventEmitter<any> = new EventEmitter();
  @Output() logs: EventEmitter<any> = new EventEmitter();

  @Input() Perfil!: boolean;
  @Input() disable = false;
  @Input() habilitaBotao!: boolean;
  @Input() disableAdmin = false;
  @Input() nomeUsuario!: string;
  @Input() ChamdoId!: string;
  @Input() id!: any;
  service!: any;
  itens: any;
  nameStatus: any;
  statusAtualizado: any;
  user: any;
  @Input() idchamado: any;
  @Input() iditens: any;
  private timerId: any;
  spinner1 = false;
  spinner2 = false;
  spinner3 = false;
  spinner14 = false;
  spinner4 = false;
  spinner5 = false;
  spinner6 = false;
  spinner7 = false;
  spinner8 = false;
  spinner9 = false;
  lodsName: any;
  cardid: any;
  @Input() done!: boolean;

  @Output() statusMud = new EventEmitter<string>();
  constructor(private sanitizer: DomSanitizer, private logApi: LogServiceService, public Auth: UserAuthService, private snackba: SnackBar, private api: ChamadoApiService, private Service: StatusChamadoService, private paranss: ActivatedRoute, private snack: SnackBar) { }

  ngOnInit(): void {
    this.cardid = this.paranss.snapshot.paramMap.get("cardid") as string;
    this.Auth.retornUser().subscribe((e) => {
      this.user = e.perfil;
    });
    this.logApi.listaLog(this.cardid).subscribe(e => {
      this.lodsName = e.content;
    });
    this.Auth.retornUser().subscribe((e) => {
      this.user = e.perfil;
    });
    this.ChamdoId = this.paranss.snapshot.paramMap.get("card") as any;
    this.id = this.paranss.snapshot.paramMap.get("id") as any;
    this.pegarApi();
    //  this.iniciarTemporizador();
  }
  getRas() {
    this.spinner1 = true;
    this.pegarApi();
    return new Promise((resolve) => {
      this.spinner1 = false;
      resolve(
        this.Pegartect.emit()
      );


    });
  }

handleSelectClick(event: any) {
    const Status = event.value;
    if (Status.includes("validacao")) {
      this.atualizarstatus();
    }
    if (Status.includes("liberar")) {
      this.atualizarstatusAguardandoTecnico();
    }
    if (Status.includes("jira")) {
      this.atualizarstatusJira();
    }
    if (Status.includes("aprovador")) {
      this.atualizarstatusAprovador();
    }
    if (Status.includes("fechar")) {
      this.atualizarstatusFechado();
    }
    if (Status.includes("recusar")) {
      this.atualizarstatusRecusado();
    }

  }

  buscar() {
    this.logApi.listaLog(this.cardid).subscribe(e => {
      this.lodsName = e.content;
    });
  }
  pegarApi() {
    this.Service.OneStatus(this.id, this.ChamdoId).subscribe(e => {
      this.itens = e.itens;
      this.service = e;
    });
  }
  StatusName() {
    this.statusMud.emit();
    return;
  }
  sanitize(html: string): SafeHtml {
    html.endsWith("30");
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  atualizarstatusJira() {
    this.spinner4 = true;
    new Promise((resolve) => {
      resolve(
        this.Service.mudaStatusJira(this.id, this.ChamdoId).subscribe(e => {
          this.snack.openSnackBar(e.msg);
          this.spinner4 = false;
          this.pegarApi();
        })
      );
    });
  }

  // iniciarTemporizador() {
  //   // Define um temporizador para chamar a função após 24 horas
  //   this.timerId = setTimeout(() => {
  //   }, 24 * 60 * 60 * 1000); // 24 horas em milissegundos
  // }
  // fechae(){
  //   this.atualizarstatusFechado();
  // }
  atualizarstatusAprovador() {
    this.spinner5 = true;
    new Promise((resolve) => {
      resolve(
        this.Service.mudaStatusaprovador(this.id, this.ChamdoId).subscribe(e => {
          this.snack.openSnackBar(e.msg);
          this.spinner5 = false;
          this.pegarApi();
        })
      );
    });
  }
  atualizarstatusAguardandoTecnico() {
    this.spinner9 = true;
    new Promise((resolve) => {
      resolve(
        this.Service.retornaChamadoAberto(this.id, this.ChamdoId).subscribe(e => {
          this.snack.openSnackBar(e.msg);
          this.spinner9 = false;
          this.pegarApi();
        })
      );
    });
  }
  atualizarstatusFechado() {
    this.spinner1 = true;
    return new Promise((resolve) => {
      resolve(
        this.Service.mudaStatusFechado(this.id, this.ChamdoId).subscribe(e => {
          this.snack.openSnackBar(e.msg);
          this.spinner1 = false;
          this.disable = false;
          this.pegarApi();
          this.ngOnInit();
        })
      );
    });
  }

  atualizarstatusRecusado() {
    this.spinner6 = true;
    new Promise((resolve) => {
      resolve(
        this.Service.mudaStatusRecusado(this.id, this.ChamdoId).subscribe(e => {
          this.snack.openSnackBar(e.msg);
          this.spinner6 = false;
          this.pegarApi();
        })
      );
    });
  }
  // reabrir chamado
  ReabrirChamado() {
    this.spinner2 = true;
    this.disable = true;
    return new Promise((resolve) => {
      resolve(
        this.Service.mudaStatusReabrir(this.id, this.ChamdoId).subscribe(e => {
          this.ngOnInit();
          this.spinner2 = false;
          this.snack.openSnackBar(e.msg);
          this.pegarApi();
        })
      );
    });
  }
  buscaLog() {
    this.logs.emit();
  }
  //mudar status chamado para aguardando cliente
  atualizarstatus() {
    this.spinner3 = true;
    this.Service.mudaStatus(this.id as any, this.ChamdoId).subscribe(e => {
      this.snack.openSnackBar(e.msg);
      this.spinner3 = false;
      this.disable = true;
      this.pegarApi();
    });
  }

}
