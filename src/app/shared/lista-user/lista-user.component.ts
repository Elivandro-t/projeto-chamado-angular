import { ChamdoId, Chamados } from './../../core/types';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ListaChamadoComponent } from '../lista-chamdo/lista-chamado.component';
import { ApiResponse, Chamado, chamadoNew } from '../../core/types';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-user',
  standalone: true,
  imports: [ListaChamadoComponent, MatPaginatorModule],
  templateUrl: './lista-user.component.html',
  styleUrl: './lista-user.component.scss'
})
export class ListaUserComponent implements OnInit {
  displayedColumns = ['card', 'referencia', 'status', 'setor', 'usuario', 'data', 'tec'];
  dataSource!: Chamados[];
  itens!: ChamdoId;
  event!: number;
  number!: number
  chamadoID:any;
  constructor(private service: ChamadoApiService) { }
  ngOnInit(): void {
    this.service.lista().subscribe((e) => {
      this.dataSource = this.Extrair(e)
      this.itens = this.Extrai(e)
      this.number = e.totalElements;
      this.chamadoID = e.content.flatMap(e=>e.id);
      console.log("id" +this.chamadoID)
    }
    )

  }
  private Extrair(response: any): Chamados[] {
    return response.content.flatMap((e: any) => e)
  }
  private Extrai(response: ApiResponse): any{
    const itens = response.content.flatMap(e =>e.itens )

    return itens.length;
  }


  geraTec() {
    // this.service.PegarTec().subscribe(e=>{
    //   console.log(e)
    // })
    alert("ola")
  }
}
