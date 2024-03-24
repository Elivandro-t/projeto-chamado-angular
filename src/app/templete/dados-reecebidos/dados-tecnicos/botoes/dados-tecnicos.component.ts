import { Chamado } from './../../../../core/types';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoApiService } from '../../../../core/chamado-api.service';
import { StatusChamadoService } from '../../../../core/status-chamado.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';

@Component({
  selector: 'app-dados-tecnicos',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './dados-tecnicos.component.html',
  styleUrl: './dados-tecnicos.component.scss'
})
export class DadosTecnicosComponent implements OnInit {
  @Output() Status: EventEmitter<any> = new EventEmitter();
  @Input() Perfil!: boolean;
  @Input() disable = false;
  @Input() habilitaBotao!:boolean;
  @Input() disableAdmin = false;
  @Input() status: any;
  @Input() Data!:any;
  @Input() ChamdoId!: string;
  @Input() id!: number;
  statusAtualizado:any;
  constructor(private Service: StatusChamadoService, private paranss: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.paranss.snapshot.paramMap.get("id") as any;
    this.ChamdoId = this.paranss.snapshot.paramMap.get("card") as any;
    switch(this.status){
      case "AGUARDANDO_TECNICO":
        this.statusAtualizado = "AGUARDANDO TECNICO";
        break;
      case " EM_ANDAMENTO":
        this.statusAtualizado = "EM ANDAMENTO";
        break;
      case "FEITO":
        this.statusAtualizado = "FEITO";
        break;
      case "RE_ABERTO":
        this.statusAtualizado = "REABERTO";
        break;
      case "AGUARDANDO_VALIDACAO":
        this.statusAtualizado = "AGUARDANDO VALIDACAO";
        break;
      case " FECHADO":
        this.statusAtualizado = " FECHADO";
        break;
      default:
        break;
    }
  }
  atualizarstatusFechado() {
    this.Service.mudaStatusFechado(this.id, this.ChamdoId).subscribe(e => {
      alert(e.msg)
    })
    setTimeout(() => {
      window.location.reload(); 
    }, 100);
  }
  // reabrir chamado
  ReabrirChamado() {
    this.Service.mudaStatusReabrir(this.id, this.ChamdoId).subscribe(e => {
      alert(e.msg)
    })
    setTimeout(() => {
      window.location.reload(); 
    }, 100);
  }
  //mudar status chamado para aguardando cliente
  atualizarstatus() {
    this.Service.mudaStatus(this.id, this.ChamdoId).subscribe(e => {
     alert(e.msg)
    })
    setTimeout(() => {
      window.location.reload();
    }, 100);
    

  }

}
