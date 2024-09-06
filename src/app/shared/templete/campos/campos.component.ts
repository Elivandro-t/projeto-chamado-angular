import { SnackBar } from './../../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable prefer-const */
import { Dialog } from '@angular/cdk/dialog';
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
import { NgxLoadingButtonsModule } from "ngx-loading-buttons";
import { Observable, startWith, map } from "rxjs";
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
import { ApiWhatsapp } from "../../../autenticacao/services/apiwhatsapp.service";
import { EnvioDeMesagemWhats } from "./EnvioDeMensagem.service";
import { Loading } from "../../../loading/Loading";

export interface User {
  id: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-campos',
  standalone: true,
  imports: [
    Loading,
    EditorModule,
    AsyncPipe, ReactiveFormsModule, MatInputModule,
    NgxLoadingButtonsModule,
    FormsModule, MatAutocompleteModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    CardsChamadosComponent,
    MatIconModule,
    MuralComponent,
    MuralPricipalComponent,
    DropComponent,
    AlertComponent,
    BotaoBackComponent
  ],
  providers: [],
  templateUrl: './campos.component.html',
  styleUrl: './campos.component.scss'
})
export class CamposComponent implements OnInit {
  val!: any;
  dat = [
    { name: "DESKTOP" },
    { name: "LEPTOP" },
    { name: "IMPRESSORA ARGOX" },
    { name: "IMPRESSORA LASER" },
    { name: "IMPRESSORA MATRICIAL" },
    { name: "BALANCA" },

  ];
  list = [
    { name: "GM CORE" },
    { name: "COLETOR" },
    { name: "WMS" },
    { name: "FINANCEIRO" },
    { name: "ZIMBRA" },
    { name: "JIRA" },
    { name: "OUTLOOK" },
    { name: "OFFICE" },
    { name: "OCTADESK" },

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
  sprinner = false;
  loadin = false;
  infor = "name";
  @ViewChild("setors") setors!: ElementRef;
  @ViewChild("solicitacao") solicitacao!: ElementRef;
  @ViewChild("patrimon") patrimon!: ElementRef;
  @ViewChild("equipa") equipa!: ElementRef;
  @ViewChild("sistem") sistem!: ElementRef;
  @ViewChild("erro") erro!: ElementRef;
  botton =false;


  descricao = "descricao";
  editorConfig = {
    selector: 'textarea',  // change this value according to your HTML
    max_height: 900,
    height: 300,
    plugins: 'autoresize anchor textcolor colorpicke autolink charmap codesample emoticons link lists  searchreplace table visualblocks wordcount linkchecker',
    toolbar: 'fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | align lineheight  | emoticons charmap',
    statusbar: false,
    menubar: false,



  };
  enter(event: any): void {
    if (event) {
      event.focus();
    }

  }
 
  constructor(private dialog: Dialog,private EnviarMsg: EnvioDeMesagemWhats,private zap: ApiWhatsapp, public service: FormService, private rout: ActivatedRoute, private http: ChamadoApiService, private router: Router, private user: UserAuthService,private SnackBar: SnackBar) {
    this.myForm = service.form;
    this.ids = this.rout.snapshot.paramMap.get("id");
    this.Servico = this.rout.snapshot.paramMap.get("data");
    this.titulo = this.rout.snapshot.paramMap.get("name");
  }
  ngOnInit() {
    this.carregar();
    this.filteredOptions = this.selecione("setor")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ""))
    );
  }
  // chamando o evento cada imagem
  onSelect(event: any) {
    // this.files.push(...event.addedFiles);
    this.files = event;
  }


  private _filter(value: string): setor[] {
    const filterValue = value.toLowerCase();
    return this.setores ? this.setores.filter(option => option.name.toLowerCase().includes(filterValue)) : [];
  }
  // funcao vindo do form
  selecione<T>(name: string) {
    const form = this.myForm.get(name);
    if (!form) {
      throw new Error("nome nao existe");
    }
    return form as FormControl;
  }
  datas(): chamadoNew {
   let  setor: string = this.selecione('setor').value;
    const data: chamadoNew = {

      usuario_logado: "",
      usuarioid: this.user.getId(),
      sistemaid: parseInt(this.ids),
      issuetype: this.rout.snapshot.paramMap.get("name") as any,
      usuario: this.selecione('usuario').value,
      titulo: this.titulo,
      sistem_erro: this.selecione('sistem_erro').value,
      erro: this.selecione('erro').value,
      equipamento: this.selecione('equipamento').value,
      setor: setor.toUpperCase(),
      patrimonio: this.selecione('patrimonio').value,
      solicitacao: this.selecione('solicitacao').value,
      descricao: this.selecione('descricao').value,
    };
    return data;
  }
  ///////////////////////////////////
  //carregando setor

  carregar() {
    this.http.pegarSetor().subscribe((e: any) => {
      this.setores = e;
    });
  }
  /// exibindo dados do equipamento
  equipamentosLista() {
    this.http.ListaEquipamento().subscribe((e: any) => {
      this.equipamento = e;
    });
  }

  salvar() {
    this.data.emit();
    this.http.registrar(this.service.form.value, this.Servico).subscribe(e => {
    });
    this.router.navigate(['/cards']);
  }
  removeHtmlTags(text: string): string {
    // Remove todas as tags HTML da string
    return text.replace(/<\/?[^>]+>/gi, '');
  }
  /// salvando dados de formulario
  onFile() {
    this.sprinner = true;
    this.botton = true;
    let usuarioID;
    let chamado: any;
    let status: any;
    this.http.pegarimg(this.chamdoId, this.files, this.datas()).subscribe((s: any) => {
      if (Array.isArray(s.itens)) {
        s.itens.forEach((e: any) => {
          chamado = e.cardId;
          status = e.status;
        });
      }
      this.sprinner = false;
      this.botton =false;
      usuarioID = s.usuarioid;
      if(s.contato!=null){
        this.EnviarMsg.PegarMsg(s.contato,s.usuario_logado,s.servico,chamado,s.usuarioid,s.id);

      }
      if(s.msg){
        this.sprinner = false;
        this.botton =false;
        this.SnackBar.openSnackBar(s.msg);
      }else{
        this.router.navigate([`/chamado/${chamado}/${s.usuarioid}/${s.id}/create`]);
        this.myForm.reset();
      }
    });





  }
  isValid(){
    return this.myForm.get("solicitacao")?.errors?.['required'] && this.myForm.get("solicitacao")?.touched;
  }
  isSetor(){
    return this.myForm.get("setor")?.errors?.['required'] && this.myForm.get("setor")?.touched;
  }
  isNome(){
    return this.myForm.get("usuario")?.errors?.['required'] && this.myForm.get("usuario")?.touched;
  }
  isPatrimonio(){
    return this.myForm.get('patrimonio')?.errors?.['pattern']&&this.myForm.get('patrimonio')?.touched;
        
  }
  isp(){
    return this.myForm.get('patrimonio')?.errors?.['maxlength']&& this.myForm.get('patrimonio')?.touched;

  }
}
