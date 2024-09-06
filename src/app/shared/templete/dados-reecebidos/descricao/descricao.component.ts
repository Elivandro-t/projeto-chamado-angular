/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ImagensComponent } from "../imagens/imagens.component";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector:"app-descricao",
    standalone:true,
    imports:[ImagensComponent,CommonModule,MatIcon],
    templateUrl:"./descricao.component.html",
    styleUrl:"./descricao.component.scss"
})
export class DescricaoComponent{
    // itens vindo da api
    @Input() i: any;
    @Input() chamado: any;
    @Input() contatos: any;
    @Input() emitBotao = new EventEmitter();
    @Input() ocultar!: boolean;
    @Input() titulo: "keyboard_arrow_up"|"keyboard_arrow_down"="keyboard_arrow_up";
    showModal: boolean = false;

    constructor(private sanitizer: DomSanitizer){}

    sanitize(html: string): SafeHtml{
       return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    contato(){
        const url = `https://web.whatsapp.com/send?phone=${this.contatos}`;
         window.open(url,"_blank");
       }
       close() {
        this.showModal = false;
        document.body.classList.remove("modal-open");
        }
    
      ocults(){
        this.ocultar=!this.ocultar;
        switch(this.ocultar){
          case true:
           return  this.titulo="keyboard_arrow_down";
          case false:
            return  this.titulo = "keyboard_arrow_up";
        }
        
      }
      
    
}