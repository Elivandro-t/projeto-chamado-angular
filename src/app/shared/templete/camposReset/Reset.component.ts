/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";
import { EditorModule } from "@tinymce/tinymce-angular";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { CardsChamadosComponent } from "../../../Home/tela-home/cards/cards-chamados/cards-chamados.component";
import { BotaoBackComponent } from "../../../components/botao_voltar/botaoVoltar.component";
import { MuralComponent } from "../../../components/mural-secundary/mural.component";
import { MuralPricipalComponent } from "../../../components/mural/mural-pricipal/mural-pricipal.component";
import { ChamadoApiService } from "../../../core/chamado-api.service";
import { setor, chamadoNew } from "../../../core/types";
import { UserAuthService } from "../../../core/user-auth.service";
import { FormService } from "../../../core/form.service";
import { DropComponent } from "./drop/drop.component";
import { AlertComponent } from "../../../Home/tela-home/cards/cards-anuncios/alert/alert.component";
import { ResetColetorComponent } from "./arquivos/ResetColetor.componet";
import { Filter2Component } from "./Filter2/Filter2.component";
import { url } from "node:inspector";
import { Filter3Component } from "./Filter3/Filter3.component";

export interface User {
  id: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-requisicao',
  standalone: true,
  imports: [
    EditorModule,
    AsyncPipe, ReactiveFormsModule, MatInputModule,
    FormsModule, MatAutocompleteModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    CardsChamadosComponent,
    Filter2Component,
    MatIconModule,
    MuralComponent,
    MuralPricipalComponent,
    DropComponent,
    AlertComponent,
    BotaoBackComponent,
    ResetColetorComponent,
    Filter3Component
  ],
  providers: [],
  templateUrl: './Reset.component.html',
  styleUrl: './Reset.component.scss'
})
export class ResetComponent {
  list  = [
    {name:"CRIACAO DE CONTA AD"},
    {name:"RESET SENHA COLETOR"},
    {name:"ACESSO ESPECIFICO AO USUARIO"},
    {name:"ADICIONAR FILIAL"},
    {name:"RESET DE SENHA ZIMBRA"},
    {name:"RESET DE SENHA MAESTRO"},
    {name:"RESET DE SENHA JIRA"},
    {name:"RESET DE CONTA AD"},
    {name:"SOLICITACAO DE PACOTE OFFICE"},
    {name:"SOLICITACAO DE VPN"},
    {name:"CRIACAO DE EMAIL"}

  ];
 @Output() files: File[] = [];
  @Output() data = new EventEmitter();
  myForm: FormGroup;
  changeImage = false;
  setores!: setor[];
  filteredOptions!: Observable<setor[]> | undefined;
  equipamento!: any[];
  card!: any;
  chamdoId: any;
  ids!: any;
  Servico!: any;
  titulo: any;
  setor = new FormControl("");
  tinyKay = environment.tinyKey;
  sprinner=false;
  loadin =false;
  infor="name";
  @ViewChild("setors") setors!: ElementRef;
  @ViewChild("solicitacao") solicitacao!: ElementRef;
  @ViewChild("patrimon") patrimon!: ElementRef;
  @ViewChild("equipa") equipa!: ElementRef;
  @ViewChild("sistem") sistem!: ElementRef;
  @ViewChild("erro") erro!: ElementRef;

  filter1!: boolean;
  filter2 =false;
  filter3 =false;
  filter4 =false;
  filter5 =false;
  filter6 =false;
  filter7 =false;
  filter8 =false;
  filter9 =false;
  filter10 = false;
  filter11 = false;

  solicitacaoUsuario: any;
  tituloUsuario: any;

  
  descricao ="descricao";
  editorConfig = {
    selector: 'textarea',  // change this value according to your HTML
    max_height:900, 
    height:300,
    plugins: 'autoresize anchor textcolor colorpicke autolink charmap codesample emoticons link lists  searchreplace table visualblocks wordcount linkchecker',
    toolbar: 'fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | align lineheight  | emoticons charmap',
    statusbar:false,
    menubar:false,
  
    
    
  };
  eventClick(event: any){
    this.tituloUsuario = event.target.value;
    this.solicitacaoUsuario = event.target.value;
    const valueData = event.target.value;

    const filter: {[key: string]: string[]}={
    "CRIACAO DE CONTA AD": ["filter1"],
      "RESET SENHA COLETOR" :["filter2"],
      "ACESSO ESPECIFICO AO USUARIO": ["filter3"],
      "ADICIONAR FILIAL": ["filter4"],
      "RESET DE SENHA ZIMBRA": ["filter5"],
      "RESET DE SENHA MAESTRO": ["filter6"],
      "RESET DE SENHA JIRA": ["filter7"],
      "RESET DE CONTA AD": ["filter8"],
      "SOLICITACAO DE PACOTE OFFICE": ["filter9"],
      "SOLICITACAO DE VPN":["filter10"],
      "CRIACAO DE EMAIL":["filter11"]
  
    };
    if(valueData.includes("CRIACAO DE CONTA AD")){
      this.filter1=true;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("RESET SENHA COLETOR")){
      this.filter1=false;this.filter2=true,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("ACESSO ESPECIFICO AO USUARIO")){
      this.filter1=false;this.filter2=false,this.filter3=true, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("RESET DE SENHA ZIMBRA")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=true,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("RESET DE SENHA MAESTRO")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=true, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("RESET DE SENHA JIRA")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=true,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
    }
    if(valueData.includes("RESET DE CONTA AD")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=true,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("SOLICITACAO DE PACOTE OFFICE")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=true,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    }
    if(valueData.includes("SOLICITACAO DE VPN")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=true,this.filter10=false;
      this.filter11=false;
    }
    if(valueData.includes("ADICIONAR FILIAL")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=true;this.filter11=false;

    }
    if(valueData.includes("CRIACAO DE EMAIL")){
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false,this.filter11=true;
      this.filter11=true;
    }
    
  }
 
  constructor(public service: FormService, private rout: ActivatedRoute,public Auth: UserAuthService, private http: ChamadoApiService, private router: Router, public user: UserAuthService) {
    this.myForm = service.form;
    this.ids = this.rout.snapshot.paramMap.get("id");
    this.Servico = this.rout.snapshot.paramMap.get("data");
    this.titulo = this.rout.snapshot.paramMap.get("name");
  } 
  desabilitar(){
    new Promise(()=>{
      this.filter1=false;this.filter2=false,this.filter3=false, 
      this.filter4=false,this.filter5=false, this.filter6=false,
      this.filter7=false,this.filter8=false,this.filter9=false,this.filter10=false; 
      this.filter11=false;
    });
    window.location.reload();

   }
  
}
