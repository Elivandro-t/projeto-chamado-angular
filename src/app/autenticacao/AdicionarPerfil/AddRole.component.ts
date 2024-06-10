/* eslint-disable @typescript-eslint/no-explicit-any */
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ElementRef,ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { AcitiveModule } from '../../core/activete.module';
import { MatIcon } from '@angular/material/icon';
import { RoleServiceComponent } from '../../AlertaDialog/AlertRole/role-service.component';
import { Router } from '@angular/router';
import { MuralComponent } from '../../components/mural-secundary/mural.component';
import { BotaoBackComponent } from '../../components/botao_voltar/botaoVoltar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [BotaoBackComponent,MuralComponent,MatButtonModule, MatInputModule,MatIcon, MatButtonModule, AcitiveModule, ReactiveFormsModule, CommonModule],
  templateUrl: './AddRole.component.html',
  styleUrl: './AddRole.component.scss'
})
export class AddRoleComponent  implements AfterViewInit{
  detalheUser!: any;
  img: boolean = false;
  @ViewChild('roleBusca') roleBusca!: ElementRef;
  form = new FormGroup({
    email:new FormControl("")
  });
  constructor(private service: UserService,private matDialog: MatDialog,private router: Router) { }
  ngAfterViewInit(): void { 
    this.roleBusca.nativeElement.focus();
  }
  Edit(){
     this.matDialog.open(RoleServiceComponent);
   }
   buscar(){
    if(this.form.get("email")?.value!=null){
    this.service.commentDelhatlhe(this.form.get("email")?.value as any).subscribe(e => {
        if(e.email){
          this.detalheUser = e;
          this.service.email = e.email;
        }

      
    });}
   }
   id(email: any,id: number){
    this.service.removeRole(email,id).subscribe(e=>{
      alert(e.msg);
     window.location.reload();
    });
   }

}
