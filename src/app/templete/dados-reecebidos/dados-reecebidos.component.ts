import { MuralComponent } from './../mural/mural.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardsChamadosComponent } from '../../shared/cards/cards-chamados/cards-chamados.component';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { MuralPricipalComponent } from '../../mural/mural-pricipal/mural-pricipal.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DadosTecnicosComponent } from './dados-tecnicos/dados-tecnicos.component';
import { ComentsComponent } from '../coments/coments.component';

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
    ComentsComponent
  ],
  templateUrl: './dados-reecebidos.component.html',
  styleUrl: './dados-reecebidos.component.scss'
})
export class DadosReecebidosComponent implements OnInit {
  ocultar:boolean = false;
  titulo:"Mostrar"|"Ocultar"="Mostrar"
  foto:any;
  constructor(private service:ChamadoApiService,private route:ActivatedRoute){}
  ngOnInit(): void {
     const card = this.route.snapshot.paramMap.get("card") as string;
    this.service.ChamdoId(card).subscribe(e=>{
      this.foto = e.itens;
      console.log(e.itens)
    })
   
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
