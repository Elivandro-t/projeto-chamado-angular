import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoApiService } from '../../../core/chamado-api.service';

@Component({
  selector: 'app-dados-tecnicos',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './dados-tecnicos.component.html',
  styleUrl: './dados-tecnicos.component.scss'
})
export class DadosTecnicosComponent implements OnInit{
@Output() Status:EventEmitter<any> = new EventEmitter();
 @Input() disable = false;
 @Input() disableAdmin = false;
 constructor(private Service:ChamadoApiService){}
  ngOnInit(): void {
     this.Service.lista().subscribe(e=>{
      console.log(e.content)
     })
  }
 atualizarstatusFechado(){
  this.Status.emit()
  alert("chamado fechado")
}
ReabrirChamado(){
  this.Status.emit()
  alert("chamado aberto")
}
atualizarstatus(){
  this.Status.emit()
  alert("aguardando cliente")
}
atualizarstatusFeito(){
  this.Status.emit()
  alert("status alterado para feito")
}
}
