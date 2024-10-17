/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { UserAuthService } from "../../core/user-auth.service";
import { SkeletonComponent } from "./skeleton/skeleton.component";
import { RodapeComponent } from "../../shared/footer/rodape/rodape.component";
import { Itens } from "./ItensDrop";
import { CommonModule } from "@angular/common";

@Component({
    selector:"app-menu-drop",
    standalone:true,
    imports:[MatButton,MatIcon,RouterLink,SkeletonComponent,RodapeComponent,CommonModule],
    templateUrl:"./menu.component.html",
    styleUrl:"./menu.component.scss"
})

export class MenuComponent implements OnInit{
[x: string]: any;
    @Output() ativaMenu = new EventEmitter;
    menu = false;
    user: any;
    img: any;
    usuario: any;
    itensMenu = Itens;
    constructor(public Auth: UserAuthService,private router: Router){}

    isLoading = true;
    imageSrc: string | null = null;
  
    loadImage() {
      // Simula o tempo de carregamento da imagem
      setTimeout(() => {
     // Sua URL da imagem
        this.isLoading = false;
      }, 2000); // 2 segundos de delay
    }
   hashRole(roles: string[]): boolean{
    return roles.some(role=>this.user.includes(role));
   }
    ngOnInit(): void {
       this.option();
       this.loadImage();
    }
    ativar(){

        this.menu = true;
       this.ativaMenu.emit(this.menu);
    }
    s(event: any){
        event.stopPropagation(); // Impede a propagação do evento de clique

    }
    eventP(){
        this.ativaMenu.emit(this.menu);
    }

    option(){
        this.Auth.retornUser().subscribe((e) => {
          if (e && e.perfil||e.image) {
            this.user = e.perfil;
            this.img = e.imagem;
            this.usuario = e;
          }
          });
      }
      removeTOken() {
        this.Auth.removeRefreshToken();
        this.Auth.removeToken();
        this.Auth.getimageRemuve();
        this.router.navigateByUrl("auth/login");
      }
} 