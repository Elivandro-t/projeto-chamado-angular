import { UserAuthService } from './../../core/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { user } from '../../core/types';
import { AcitiveModule } from '../../core/activete.module';
import { AlertaDialogPerfilServiceComponent } from '../../AlertaDialog/AlertaPerfil/alerta-dialog-perfil-service.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Router } from '@angular/router';
import { MuralComponent } from '../../components/mural-secundary/mural.component';
import { BotaoBackComponent } from '../../components/botao_voltar/botaoVoltar.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateComponent } from './updateUsuario/update.component';
import { MenuDropComponent } from '../../shared/menu/menuDrop/menuDrop.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MenuDropComponent,MuralComponent,MenuComponent,MatIconModule,BotaoBackComponent, MatInputModule, MatButtonModule, AcitiveModule, ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  detalheUser!: user;
  img: boolean = false;
  constructor(private service: UserService,private matDialog: MatDialog,private router: Router,public auth: UserAuthService) { }
  ngOnInit(): void {
   this.chamaDadosUsuarios();
   localStorage.setItem("image",this.detalheUser.imagem);
  }
  chamaDadosUsuarios(){
   this.service.detalheUser().subscribe(e => {
      this.detalheUser = e;
      this.service.setImagem(e.imagem);
    });
  }
  @Output() imt=new EventEmitter();
  @Output() im=new EventEmitter();
  @ViewChild("perfil") perfil!: ElementRef ;

  hendleImg() {
    this.img = true;
  }
  hendleIm() {
    setTimeout(() => {
      this.img = false;
    }, 10000);
  }
  pegarbotao(){
     this.matDialog.open(AlertaDialogPerfilServiceComponent);
   }
   navigate(){
    this.imt.emit();
    this.router.navigate(["/add/role"]);
  
   }
   nav(){
    this.im.emit();
    this.router.navigate(["/add/card"]);
  
   }
   update(){
     this.matDialog.open(UpdateComponent,{data:{user:this.detalheUser}});
   }
  

}
