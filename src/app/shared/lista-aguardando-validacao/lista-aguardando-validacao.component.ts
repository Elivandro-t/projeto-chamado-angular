/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, Chamados } from './../../core/types';
import { Component, OnInit } from '@angular/core';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { ChamadoApiService } from '../../core/chamado-api.service';

@Component({
  selector: 'app-lista-aguardando-validacao',
  standalone: true,
  imports: [ListaChamadoComponent],
  templateUrl: './lista-aguardando-validacao.component.html',
  styleUrl: './lista-aguardando-validacao.component.scss'
})
export class ListaAguardandoValidacaoComponent implements OnInit{
  displayedColumns = ['card', 'referencia', 'status', 'setor', 'usuario', 'data', 'tec'];
  number!: number;
  Lista!: Chamados[];
  constructor(private service: ChamadoApiService){}
  ngOnInit(): void {
    this.service.listaAguardandoValidacao().subscribe(e=>{
        this.Lista = this.tranforma(e);
        this.number = this.tranformaLength(e);
    });
  }
  tranforma(e: ApiResponse): any{
    return e.content.flatMap(e=>e);
  }
  tranformaLength(e: ApiResponse): any{
    const itens = e.content.flatMap(e=>e);
    return itens.length;
  }

}
