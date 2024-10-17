/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { EditorModule } from "@tinymce/tinymce-angular";
import { environment } from "../../../../../environments/environment";
import { BotaoBackComponent } from "../../../../components/botao_voltar/botaoVoltar.component";
import { MuralComponent } from "../../../../components/mural-secundary/mural.component";
import { MuralPricipalComponent } from "../../../../components/mural/mural-pricipal/mural-pricipal.component";
import { FormComprasService } from "../../../../core/formCompras.service";
import { CardsChamadosComponent } from "../../../../Home/tela-home/cards/cards-chamados/cards-chamados.component";
import { Loading } from "../../../../loading/Loading";
import { AlertComponent } from "../../alerta/alert/alert.component";
import { DropComponent } from "../drop/drop.component";
import { map, Observable, startWith } from "rxjs";
import { ChamadoApiService } from "../../../../core/chamado-api.service";
import { setor } from "../../../../core/types";


@Component({
    selector:"app-compras",
    standalone:true,
    imports:[
        Loading,
    EditorModule,
    AsyncPipe, ReactiveFormsModule, MatInputModule,
    FormsModule, MatAutocompleteModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    CardsChamadosComponent,
    MatIconModule,
    MuralComponent,
    MuralPricipalComponent,
    DropComponent,
    AlertComponent,
    AsyncPipe,
    BotaoBackComponent
    ],
    templateUrl:"./compras.component.html",
    styleUrl:"./compras.component.scss"
})
export class ComprasComponent implements OnInit {
    tinyKay = environment.tinyKey;
    filteredOptions: Observable<setor[]> | undefined;
    filter: any[] | undefined;

    @ViewChild("usuario") suario!: ElementRef;
    @ViewChild("setor") setor!: ElementRef;
    @ViewChild("equipamento") equipamento!: ElementRef;
    @ViewChild("patrimonio") patrimonio!: ElementRef;
    @ViewChild("descricao") descricao!: ElementRef;
    formCompras!: FormGroup;
    setores: any;
    myForm: any;
    botton = false;
    myEp!: any[];
    constructor(private form: FormComprasService, private http: ChamadoApiService){
          this.formCompras = form.formCompras;
    }
    enter(event: any){
        if(event){
            event.focus();
        }
    }
    editorConfig = {
        selector: 'textarea',  // change this value according to your HTML
        max_height: 900,
        height: 300,
        plugins: 'autoresize anchor textcolor colorpicke autolink charmap codesample emoticons link lists  searchreplace table visualblocks wordcount linkchecker',
        toolbar: 'fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | align lineheight  | emoticons charmap',
        statusbar: false,
        menubar: false,
    
    
    
      };

      ngOnInit() {
        this.carregar();
        this.filteredOptions = this.selecione("setor")?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ""))
        );
      }
      carregar() {
        this.http.pegarSetor().subscribe(e => {
          this.setores = e;
          console.log(e);
        });
      }
      // chamando o evento cada imagem
    
      private _filter(value: string): setor[] {
        const filterValue = value.toLowerCase();
        return this.setores ? this.setores.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue)) : [];
      }
       private _filters(value: any): setor[] {
        const filterValue = value.toLowerCase();
        return this.equipamentos ? this.equipamentos.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue)) : [];
      }
      // funcao vindo do form
      selecione<T>(name: string) {
        const form = this.form.formCompras.get(name);
        if (!form) {
          throw new Error("nome nao existe");
        }
        return form as FormControl;
      }

      enviar(){
        this.botton = true;
      }


    equipamentos = [
      {"name":"LAPTOP"},
      {"name":"DESKTOP"},
      {"name":"IMPRESSORA"},
      {"name":"BALANCA"},
      {"name":"COLETOR"},
      {"name":"CELULAR"},
      {"name":"TABLET"}
    ];

   
}

