import { SnackBar } from '../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { ApiResponse, Chamados } from '../../core/types';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { MatDialog } from '@angular/material/dialog';
import { AcitiveModule } from '../../core/activete.module';
import { BuscaService } from '../../core/busca.service';
import { Subscription } from 'rxjs';
interface ativo {
  ativo: boolean;
}
@Component({
  selector: 'app-lista-adm',
  standalone: true,
  imports: [ListaChamadoComponent, AcitiveModule],
  templateUrl: './lista-tecnico.component.html',
  styleUrl: './lista-tecnico.component.scss'
})
export class ListaTecnicoComponent implements OnInit, OnDestroy {

  displayedColumns = ['Cards', 'referencias', 'status', 'setores', 'Solicitantes', 'Data de criação', 'Assis tec'];
  dataSouce!: Chamados[];
  number!: number;
  totalPages!: number;
  itens!: any;
  ativo!: boolean;
  minhaSubscription: Subscription | undefined;
  itemTotal: any;
  size=5;
  constructor(private service: ChamadoApiService, public busca: BuscaService, private snackBar: SnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ativo = true;
    this.busca.form.reset();
    this.gerar();
  }
  gerarativo(event: boolean) {
    this.busca.form.reset();
    this.ativo = event;
    this.gerar();
  }


  gerar() {
    const data = {
      dataAntes:this.busca.form.get("dataAntes")?.value,
      dataDepois:this.busca.form.get("dataDepois")?.value
    };
    this.minhaSubscription = this.service.ListaTecnico(this.totalPages,this.size).subscribe((e: any) => {
      this.dataSouce = this.transformeEmItens(e);
      this.itens = this.transformeEmIten(e);
      this.itemTotal = {...e.itens};
      this.number = e.totalPages;
      
    });
  }
  ngOnDestroy(): void {
    if (this.minhaSubscription) {
      this.minhaSubscription.unsubscribe();
    }
  }
  emitSize(event: any){
   this.size = event.target.value;
   this.gerar();
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

 
}