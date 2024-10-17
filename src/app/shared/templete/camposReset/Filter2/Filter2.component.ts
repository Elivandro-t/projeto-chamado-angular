import { SnackBar } from './../../../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";
import { EditorModule } from "@tinymce/tinymce-angular";
import { Observable, startWith, map } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { CardsChamadosComponent } from "../../../../Home/tela-home/cards/cards-chamados/cards-chamados.component";
import { BotaoBackComponent } from "../../../../components/botao_voltar/botaoVoltar.component";
import { MuralComponent } from "../../../../components/mural-secundary/mural.component";
import { MuralPricipalComponent } from "../../../../components/mural/mural-pricipal/mural-pricipal.component";
import { ChamadoApiService } from "../../../../core/chamado-api.service";
import { setor } from "../../../../core/types";
import { UserAuthService } from "../../../../core/user-auth.service";
import { FormService } from "../../../../core/form.service";
import { AlertComponent } from "../../alerta/alert/alert.component";
import { DropComponent } from "../drop/drop.component";
import { CpfValidationService } from "../validator.service";
import { EnvioDeMesagemWhats } from "../../campos/EnvioDeMensagem.service";
import { Loading } from "../../../../loading/Loading";
export interface User {
  id: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    EditorModule,
    AsyncPipe, ReactiveFormsModule, MatInputModule,
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
    BotaoBackComponent,
    Loading
  ],
  providers: [],
  templateUrl: './Filter2.component.html',
  styleUrl: './Filter2.component.scss'
})
export class Filter2Component implements OnInit {
  @Output() EnviarRequisecaoReset = new EventEmitter();
  list = [
    { name: "ADD ROTINA GM CORE" },
    { name: "RESET SENHA COLETOR" },
    { name: "ADD ROTINA WMS" },
    { name: "ADD ROTINA FINANCEIRO" },
    { name: "RESET DE SENHA ZIMBRA" },
    { name: "RESET DE SENHA MAESTRO" },
    { name: "RESET DE SENHA JIRA" },
    { name: "CRIACAO CONTA OUTLOOK" },
    { name: "RESET SENHA OUTLOOK" },
    { name: "SOLICITAR OFFICE WEB" },
    { name: "OCTADESK" },

  ];
  @Output() files: File[] = [];
  @Input() ativo = true;

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
  @ViewChild("gmid") gmid!: ElementRef;
  @ViewChild("cpf") cpf!: ElementRef;
  @ViewChild("filial") filial!: ElementRef;
  @ViewChild("custo") custo!: ElementRef;
  @ViewChild("email") email!: ElementRef;
  @ViewChild("cargo") cargo!: ElementRef;
  @ViewChild("gestor") gestor!: ElementRef;
  @ViewChild("emailGestor") emailGestor!: ElementRef;
  @Input() solicitacaoUsuario: any;
  @Output() desbiled = new EventEmitter();
  botton = false;

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
  constructor(private SnackBar: SnackBar,private EnviarMsg: EnvioDeMesagemWhats,private validatorCpf: CpfValidationService, public service: FormService, private rout: ActivatedRoute, private http: ChamadoApiService, private router: Router, private user: UserAuthService) {
    this.myForm = service.formControl;
    this.ids = this.rout.snapshot.paramMap.get("id");
    this.Servico = this.rout.snapshot.paramMap.get("data");
    this.titulo = this.rout.snapshot.paramMap.get("name");
  }
  ngOnInit() {
    this.carregar();
    this.filteredOptions = this.getSelect("setor")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ""))
    );
    // this.equipamentosLista();
    // this.http.lista().subscribe(e => {
    //   e.content.flatMap(e=>{
    //     this.chamdoId =e.id
    //   })
    // })
  }
  // chamando o evento cada imagem
  // onSelect(event: any) {
  //   // this.files.push(...event.addedFiles);
  //   this.files = event;
  // }
  desabilitarCampo(){
    this.desbiled.emit();
  }

  private _filter(value: string): setor[] {
    const filterValue = value.toLowerCase();
    return this.setores ? this.setores.filter(option => option.name.toLowerCase().includes(filterValue)) : [];
  }
  // funcao vindo do form
  getSelect<T>(name: string) {
    const form = this.myForm.get(name);
    if (!form) {
      throw new Error("Nome nao existe");
    }
    return form as FormControl;
  }
  datas(): any {
    const data: any = {
      usuarioid: 0,
      usuario_logado:"",
      titulo: this.titulo,
      sistemaid: parseInt(this.ids),
      issuetype: this.rout.snapshot.paramMap.get("name") as any,
      usuario: this.getSelect('usuario').value,
      setor: this.getSelect('setor').value,
      cpf: this.getSelect('cpf').value,
      gmid: this.getSelect('gmid').value,
      filial: this.getSelect('filial').value,
      emailUsuario:this.getSelect('emailUsuario').value,
      centro_de_custo:this.getSelect('centroDeCusto').value,
      nomeDogestor:this.getSelect('nomeDogestor').value,
      emailGestorAprovador:this.getSelect('emailGestorAprovador').value,
      funcao: this.getSelect('funcao').value,
      solicitacao: this.solicitacaoUsuario,
      descricao:this.getSelect('descricao').value,

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
  /// salvando dados de formulario
  onFile() {
    let id: any;
        this.sprinner =true;
        this.botton =true;
        const form = this.myForm.get("cpf")?.value;
        if(this.validatorCpf.validateCPF(form)){
          this.http.pegarimg(this.chamdoId, this.files, this.datas()).subscribe((s: any) => {
            id = s.id;
          let chamado;
            if (Array.isArray(s.itens)) {
              s.itens.forEach((e: any) => {
                chamado = e.cardId;
              });
            }
            this.botton = false;
            this.sprinner=false;
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
        }else{
          this.SnackBar.openSnackBar("CPF invalido");
          this.botton =false;
            this.sprinner=false;
        }
  }
  formatCpf(Cpf: any){
    const input = Cpf.target;
    const inputValue = input.value.replace(/\D/g,'').substring(0,10);
    input.value = inputValue
    .replace(/^(\d{3})(\d)/, '$1.$2')   // Adiciona ponto após os primeiros 3 dígitos
  .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')   // Adiciona ponto após os segundos 3 dígitos
  .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }

}