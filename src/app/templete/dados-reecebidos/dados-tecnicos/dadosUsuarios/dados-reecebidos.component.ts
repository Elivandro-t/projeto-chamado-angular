import { Chamado } from './../../../../core/types';
import { MuralComponent } from '../../../mural/mural.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardsChamadosComponent } from '../../../../shared/cards/cards-chamados/cards-chamados.component';
import { ChamadoApiService } from '../../../../core/chamado-api.service';
import { MuralPricipalComponent } from '../../../../mural/mural-pricipal/mural-pricipal.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DadosTecnicosComponent } from '../botoes/dados-tecnicos.component';
import { ComentsComponent } from '../../../coments/coments.component';
import { AlertComponent } from '../../../../shared/cards/cards-anuncios/alert/alert.component';
import { StatusChamadoService } from '../../../../core/status-chamado.service';

@Component({
  selector: 'app-dados-reecebidos',
  standalone: true,
  imports: [
    AsyncPipe,
    DadosTecnicosComponent,
    MatAutocompleteModule,
    CommonModule,
    CardsChamadosComponent,
    MuralComponent,
    MuralPricipalComponent,
    ComentsComponent,
    AlertComponent
  ],
  templateUrl: './dados-reecebidos.component.html',
  styleUrl: './dados-reecebidos.component.scss'
})
export class DadosReecebidosComponent implements OnInit {
  ocultar:boolean = false;
  titulo:"Mostrar"|"Ocultar"="Mostrar"
  foto:any;
  id:any;
  user:any="admin"
  desable:boolean = false;
  desableButton:boolean = false;

 
  constructor(private service:ChamadoApiService,private route:ActivatedRoute,private servicestatus:StatusChamadoService){}
  ngOnInit(): void {
     const card = this.route.snapshot.paramMap.get("card") as string;
     const id = this.route.snapshot.paramMap.get("id") as any;
    this.service.ChamadoId(card,id).subscribe(e=>{
      this.foto = e.itens;
      switch (this.user) {
        case "admin":
          this.desable = false;
          this.desableButton = true;
          break;
        case "user":
           this.desable = true;
          break;
        default:
          break;
       }
      

    })
   
  }

  atualizarstatus(id:number,Chamado:string){
 
   
    alert("id "+id+ "card"+Chamado)
  
  }
  ocults(){
    this.ocultar=!this.ocultar;
    switch(this.ocultar){
      case true:
       return  this.titulo="Ocultar";
      case false:
        return  this.titulo = "Mostrar";
    }
  }

}
