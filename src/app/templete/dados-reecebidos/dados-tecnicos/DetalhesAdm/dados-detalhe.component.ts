import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ActivatedRoute } from "@angular/router";
import { ChamadoApiService } from "../../../../core/chamado-api.service";
import { MuralPricipalComponent } from "../../../../mural/mural-pricipal/mural-pricipal.component";
import { CardsChamadosComponent } from "../../../../shared/cards/cards-chamados/cards-chamados.component";
import { ComentsComponent } from "../../../coments/coments.component";
import { MuralComponent } from "../../../mural/mural.component";
import { DadosTecnicosComponent } from "../botoes/dados-tecnicos.component";
import { AlertComponent } from "../../../alerta/alert/alert.component";


@Component({
    selector: 'app-dados-detahe',
    standalone: true,
    templateUrl: './dados-detalhe.component.html',
    styleUrl: './dados-detalhe.component.scss',
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
        
        
    ]
})
export class DadosDetalheComponent implements OnInit {
  ocultar:boolean = false;
  titulo:"Mostrar"|"Ocultar"="Mostrar"
  foto:any;
  id:any;
  user:any="admin"
  desable:boolean = false;
  desableButton:boolean = false;

 
  constructor(private service:ChamadoApiService,private route:ActivatedRoute){}
  ngOnInit(): void {
     const card = this.route.snapshot.paramMap.get("card") as string;
     const id = this.route.snapshot.paramMap.get("id") as any;
    this.service.ChamadoId(card,id).subscribe(e=>{
      this.foto = e.itens;
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
