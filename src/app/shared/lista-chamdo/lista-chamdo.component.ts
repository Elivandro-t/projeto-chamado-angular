import { ApiResponse, Chamado } from './../../core/types';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Output, viewChild } from '@angular/core';
import { MuralPricipalComponent } from '../../mural/mural-pricipal/mural-pricipal.component';
import { ListaComponent } from '../ListaChamdo/lista/lista.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChamadoApiService } from '../../core/chamado-api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-lista-chamdo',
  standalone: true,
  imports: [MuralPricipalComponent,MatProgressSpinnerModule,ReactiveFormsModule,ListaComponent,CommonModule,
    MatTableModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  templateUrl: './lista-chamdo.component.html',
  styleUrl: './lista-chamdo.component.scss',
})
export class ListaChamdoComponent implements OnInit{
  displayedColumns = ['card', 'referencia', 'status','usuario','data','tec'];
  dataSource!:Chamado[];
  number!:number
  private inteval:any;
  constructor(private service:ChamadoApiService,private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
  
    this.service.lista().subscribe((e)=>{
      this.dataSource = this.Extrair(e)
      this.number = e.totalElements;
     }
     )
      this.cdr.detectChanges()
  
  }
  private Extrair(response:ApiResponse):Chamado[]{
    return response.content.flatMap(e=>e.itens)
  }
}
