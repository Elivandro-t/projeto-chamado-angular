import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { ApiResponse,Chamados } from '../../core/types';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertaDialogServiceComponent } from '../../AlertaDialog/alerta-dialog-service/alerta-dialog-service.component';
@Component({
  selector: 'app-lista-adm',
  standalone: true,
  imports: [ListaChamadoComponent],
  templateUrl: './lista-adm.component.html',
  styleUrl: './lista-adm.component.scss'
})
export class ListaAdmComponent implements OnInit{

  displayedColumns = ['card', 'referencia', 'status','setor','usuario','data','tec',''];
  dataSouce!:Chamados[];
  number!:number;
  totalPages!:number;
  itens!:any;
  constructor(private service:ChamadoApiService,private dialog:MatDialog){}
  ngOnInit(): void {
    try {
      
      this.service.ListaAdm(this.totalPages).subscribe((e)=>{
          this.dataSouce = this.transformeEmItens(e);
          this.itens = this.transformeEmIten(e);
          console.log("meus itens" +this.itens)

          this.number = e.totalPages
      })
    } catch (error) {
    }
  }
  pegarEvent(event:number){
    this.totalPages = event;
     this.ngOnInit()
   }
  transformeEmItens(Itens:ApiResponse):any{
    return Itens.content.flatMap(e=>e) as any;
}
transformeEmIten(Itens:ApiResponse):any[]{
 const itens = Itens.content.flatMap(e=>e.itens) as any;
  return itens.length;
}
getRas(event:any,ids:any) {
      
  this.service.PegarTec(event.id, ids.Idchamado).subscribe(e => {
  
      // this.dialog.open(AlertaDialogServiceComponent, { data: { informacoes: e } })
 
  })
  this.ngOnInit()
}
}