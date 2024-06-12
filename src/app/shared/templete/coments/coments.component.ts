/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserService } from './../../../autenticacao/services/user.service';

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-coments',
  standalone: true,
  imports: [EditorModule,ReactiveFormsModule,FormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './coments.component.html',
  styleUrl: './coments.component.scss'
})

export class ComentsComponent implements OnInit,AfterViewInit{
  @ViewChild('textArea') private commentsContainer!: ElementRef;
  @ViewChild("textAreaForm") textAreaForm!: ElementRef;
  resizeEnabled = true;
  quandadeDeItens!: any;
  form!: FormGroup;
  cooments!: any[];
  detalhe: any;
  img: any;
  exibiBotao: boolean = false;
  @Input() chamadoId!: number;
  imagens: { [key: string]: string }={};
  numComentariosExibidos = 3;
  constructor(public Auth: UserAuthService,private sanitizer: DomSanitizer,public Formb: FormBuilder,private userApi: UserService,public http: CommentsService,private user: UserAuthService){}
  ngAfterViewInit(): void {
    this.commentsContainer.nativeElement.addEventListener('input',this.Resize.bind(this));
    this.textAreaForm.nativeElement.addEventListener('click',()=>{
      this.textAreaForm.nativeElement.style.padding="0 40px";
      this.textAreaForm.nativeElement.style.border="0";
      this.exibiBotao = true;
    });
    this.Auth.retornUser().subscribe((e) => {
       this.img = e.imagem;
     });
  }
  Resize(){
    this.commentsContainer.nativeElement.style.height="auto";
    this.commentsContainer.nativeElement.style.height
    =this.commentsContainer.nativeElement.scrollHeight+'px';

  }
  // Defina o número inicial de comentários a serem exibidos
comments: any[] = []; // Suponho que você tenha um array para armazenar todos os comentários

carregarMaisComentarios() {
    // Aumente o número de comentários a serem exibidos quando o botão for clicado
    this.numComentariosExibidos += 5; // Ajuste o valor conforme necessário
}
  editorConfig = {
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    statusbar:false
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
    comment:[""]
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
    if(this.datas().comments.trim()!=""){
      this.http.RegistroComment(this.chamadoId,this.datas()).subscribe(()=>{
        this.http.comment(this.chamadoId).subscribe(e=>{
          this.cooments=e.itens;
          this.quandadeDeItens  =  this.pegarItens(e.itens);
        });
       });
        this.form.reset();
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
          userImagem:this.user.getimage() as any
    };
    return data;
  }
}


