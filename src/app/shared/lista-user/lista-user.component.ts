/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChamdoId, Chamados } from './../../core/types';
import { Component, Input, OnInit } from '@angular/core';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { ApiResponse } from '../../core/types';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BuscaService } from '../../core/busca.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-lista-user',
  standalone: true,
  imports: [ListaChamadoComponent, MatPaginatorModule],
  templateUrl: './lista-user.component.html',
  styleUrl: './lista-user.component.scss'
})
export class ListaUserComponent implements OnInit {
  displayedColumns = ['Card', 'Ref', 'Status', 'Setor', 'Solicitante', 'Data de criação', 'Atendente'];
  dataSource!: Chamados[];
  itens!: ChamdoId;
  event!: number;
  number!: number;
  chamadoID: any;
  ativo!: boolean;
  size = 10;
  minhaSubscription: Subscription | undefined;

 totalPage: any;
  constructor(private service: ChamadoApiService, public busca: BuscaService) { }
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
    this.size = event.target.value;
  }
  pegarEvent(event: number) {
    this.totalPage = event;
    this.gerar();
  }
  gerar(){
    const data = {
      dataAntes:this.busca.form.get("dataAntes")?.value,
      dataDepois:this.busca.form.get("dataDepois")?.value
    };
    this.service.lista(this.ativo,this.totalPage,this.size,data.dataAntes,data.dataDepois).subscribe((e) => {
      this.dataSource = this.Extrair(e);
      this.itens = this.Extrai(e);
      this.number = e.totalPages;
      this.chamadoID = e.content.flatMap(e=>e.id);
      localStorage.setItem("idcard", this.chamadoID);
      

    }
    );

  }
  private Extrair(response: any): Chamados[] {
    return response.content.flatMap((e: any) => e);
  }
  private Extrai(response: ApiResponse): any{
    const itens = response.content.flatMap(e =>e.itens );

    return itens.length;
  }
  ngOnDestroy(): void {
    if (this.minhaSubscription) {
      this.minhaSubscription.unsubscribe();
    }
  }
  
}
