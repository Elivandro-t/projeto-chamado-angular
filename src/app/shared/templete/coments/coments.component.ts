/* eslint-disable prefer-const */
import { Input } from '@angular/core';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserService } from './../../../autenticacao/services/user.service';

import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../../autenticacao/services/comments.service/comment.service';
import { commentRegiste } from '../../../autenticacao/services/comments.service/commentType';
import { UserAuthService } from '../../../core/user-auth.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DropComponent } from '../campos/drop/drop.component';
import { ImagensComponent } from '../dados-reecebidos/imagens/imagens.component';
import { CommentZap } from './ComentZap.service';
// import { EditorModule } from 'primeng/editor';
@Component({
  selector: 'app-coments',
  standalone: true,
  imports: [ImagensComponent,EditorModule,ReactiveFormsModule,FormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,CommonModule,DropComponent],
  templateUrl: './coments.component.html',
  styleUrl: './coments.component.scss'
})

export class ComentsComponent implements OnInit,AfterViewInit{
  @ViewChild('textArea') private commentsContainer!: ElementRef;
  @ViewChild("textAreaForm") textAreaForm!: ElementRef;
  @ViewChild("app") app!: ElementRef;
  @ViewChild("name",{static:false}) name!: ElementRef;

  resizeEnabled = true;
  quandadeDeItens!: any;
  @Input() servico: any;
  form!: FormGroup;
  cooments!: any[];
  detalhe: any;
  img: any;
  exibiBotao: boolean = false;
  @Input() chamadoId!: number;
  imagens: { [key: string]: string }={};
  numComentariosExibidos = 3;
  @Input() contatoCliente: any;
  @Output() files: File[] = [];
  @ViewChild("file") file!: ElementRef;
  constructor(private zap: CommentZap,public Auth: UserAuthService,private sanitizer: DomSanitizer,public Formb: FormBuilder,private userApi: UserService,public http: CommentsService,private user: UserAuthService){}
  ngAfterViewInit(): void {
    this.commentsContainer.nativeElement.addEventListener('input',this.Resize.bind(this));
    this.textAreaForm.nativeElement.addEventListener('click',()=>{
      this.exibiBotao = true;
    });
    this.Auth.retornUser().subscribe((e) => {
       this.img = e.imagem;
     });
     this.app.nativeElement.addEventListener('input',this.Resizes.bind(this));
  }
  Resize(){
    this.commentsContainer.nativeElement.style.height="auto";
    this.commentsContainer.nativeElement.style.height
    =this.commentsContainer.nativeElement.scrollHeight+'px';

  }
  Resizes(){
    this.app.nativeElement.style.height="auto";
    this.app.nativeElement.style.height
    =this.app.nativeElement.scrollHeight+'px';

  }
  // Defina o número inicial de comentários a serem exibidos
comments: any[] = []; // Suponho que você tenha um array para armazenar todos os comentários

carregarMaisComentarios() {
    // Aumente o número de comentários a serem exibidos quando o botão for clicado
    this.numComentariosExibidos += 5; // Ajuste o valor conforme necessário
}
// desabilitado devido ao teste de outro editor do priming
  editorConfig = {
    selector: 'textarea', 
    max_height:900, 
    height:150,// change this value according to your HTML
    icons: 'my_icon_pack' ,
    plugins: 'autoresize anchor textcolor colorpicke autolink charmap codesample emoticons link lists  searchreplace table visualblocks wordcount linkchecker',
    toolbar: 'fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | align lineheight  | emoticons charmap',
    statusbar:false,
    menubar:false,
  };
  exibirTodosComentarios() {
    const mt = Math.floor(Math.random()*10);
    this.numComentariosExibidos = this.numComentariosExibidos+mt;
  }
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit(): void {
    this.reload();
   this.form = this.Formb.group({
    comment:[" "]
   });
   this.cooments.forEach(e=>{
    this.users(e.email);
   });
  }
  reload(){
    this.http.comment(this.chamadoId).subscribe(e=>{
      this.cooments=e.itens;
    }
   );
  }
  users(Email: string){
  
   this.userApi.commentDelhatlhe(Email).subscribe(e=>{
    this.imagens[Email]=e.imagem;
   });
 
  }
  dataInfor(data: string){
    const forms = this.form.get(data);
    if(!forms){
      throw new Error("nada encontrado");
    }
    return forms as FormControl;
    
  }
   enviar(){
    let msg = `
*Olá*! Sou o Assistente virtual do Suporte TI.

Gostaríamos de informar que um comentário foi registrado no portal de suporte, referente ao seu chamado solicitando apoio a *${this.servico}*. Estamos trabalhando para resolver sua solicitação o mais rápido possível.

Atenciosamente,


*#Suporte da TI#*
    `;
    const tel = this.contatoCliente;
    const smg = this.form.get('comment')!.value;
   if(tel!=null){
    this.zap.PegarMsg(tel,msg);
   }
    if(this.datas().comments.trim()!=null){
      this.http.RegistroComment(this.chamadoId,this.datas(),this.files).subscribe(()=>{
        this.http.comment(this.chamadoId).subscribe(e=>{
          this.cooments=e.itens;
          this.quandadeDeItens  =  this.pegarItens(e.itens);
          
        });
       });
        this.form.reset();
        if(this.file){
          this.files = [];
          this.file.nativeElement.value = '';
        }
    }
   }
   onSelect(event: any) {
    // this.files.push(...event.addedFiles);
    this.files = event;
  }
  PegaImagens(event: any){
    if (event && event.target.files && event.target.files.length > 0) {
      this.files = [];

      for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];

          if (file.type.startsWith('image/')) {
              // Adiciona o arquivo à lista de arquivos
              this.files.push(file);
          }
      }
     
  }
  }
   pegarItens(itens: any[]): number{
    const name = itens.flatMap(e=>e);
    
   return name.length;
   }
   datas(): commentRegiste{
    const data: commentRegiste = {
 
          usuario:this.user.getname() as any,
          email:this.user.getEmail() as any,
          comments:this.form.get('comment')!.value,
          userImagem:this.img as any
    };
    return data;
  }
}


