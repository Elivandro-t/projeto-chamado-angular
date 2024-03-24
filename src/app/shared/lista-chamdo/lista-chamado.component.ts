
import {Chamados, ChamdoId } from '../../core/types';
import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { MuralPricipalComponent } from '../../mural/mural-pricipal/mural-pricipal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { BuscaService } from '../../core/busca.service';
import {MatIconModule} from '@angular/material/icon';
import { AcitiveModule } from '../../core/activete.module';


@Component({
  selector: 'app-lista-chamado',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatPaginatorModule, MuralPricipalComponent, MatProgressSpinnerModule, ReactiveFormsModule, CommonModule,
    MatTableModule, MatSelectModule,
    AcitiveModule,
     MatInputModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './lista-chamado.component.html',
  styleUrl: './lista-chamado.component.scss',
})
@Inject('root')
export class ListaChamadoComponent implements OnInit {
  constructor(private service: ChamadoApiService, public busca: BuscaService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  totalPages=0;
  @Output() PegesUpdate = new EventEmitter();
  @Output() atualizar = new EventEmitter();
  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: Chamados[];
  @Input() number!: number;
  @Input() id!: ChamdoId;
  @Input() exibir: boolean = false;
  @Input() ativo!: boolean;
  disable=false
  disableNext=false
next() {
 this.totalPages+=1
 this.PegesUpdate.emit(this.totalPages)
  if(this.totalPages>=this.number){
    this.disableNext = true;
    this.disable = false  
 }

}
back() {
  this.disableNext =false;
 this.totalPages-=1
 this.PegesUpdate.emit(this.totalPages)
 if(this.totalPages<=0){
   this.disable = true;
 }

}
  gera() {
    alert(this.busca.form?.get("search")?.value)
  }
  getRa(id: number, Idchamado: number) {
       this.atualizar.emit({id,Idchamado})
       this.ngOnInit()
  }

  al(){
    alert("nem")
  }
  
}
