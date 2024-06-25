/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChamdoId, Chamados } from './../../core/types';
import { Component, Input, OnInit } from '@angular/core';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { ApiResponse } from '../../core/types';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BuscaService } from '../../core/busca.service';
@Component({
  selector: 'app-lista-user',
  standalone: true,
  imports: [ListaChamadoComponent, MatPaginatorModule],
  templateUrl: './lista-user.component.html',
  styleUrl: './lista-user.component.scss'
})
export class ListaUserComponent implements OnInit {
  displayedColumns = ['Cards', 'Ref', 'Status', 'Setores', 'Solicitantes', 'Data de criação', 'Assis tec'];
  dataSource!: Chamados[];
  itens!: ChamdoId;
  event!: number;
  number!: number;
  chamadoID: any;
  ativo!: boolean;
  size = 10;
 @Input() totalPage: any;
  constructor(private service: ChamadoApiService, public busca: BuscaService) { }
  ngOnInit(): void {
    this.ativo = true;
     new Promise((resolve)=>{
      resolve(this.gerar());
    });
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
    this.service.lista(this.totalPage,this.size,this.ativo).subscribe((e) => {
      this.dataSource = this.Extrair(e);
      this.itens = this.Extrai(e);
      this.number = e.totalElements;
      this.chamadoID = e.content.flatMap(e=>e.id);
      this.totalPage = e.totalPages;
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
  
}
