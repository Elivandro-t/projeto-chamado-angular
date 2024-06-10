/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserService } from '../../autenticacao/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,MatIconModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './alerta-dialog-perfil-service.component.html',
  styleUrl: './alerta-dialog-perfil-service.component.scss'
})
export class AlertaDialogPerfilServiceComponent{
image!: File;
ima: any;
msg: boolean = false;
constructor(private user: UserService,private router: Router){}
 hendle(event: any){
  const TargetImg = event.target as HTMLInputElement;
  if(TargetImg.files&&TargetImg.files.length>0){
    this.image=TargetImg.files[0];
    const render = new FileReader();
    this.msg=true;
    render.onload = ()=>{
      this.ima = render.result;
    };
    render.readAsDataURL(this.image);
  }
 }

 hendleapi(){

        this.user.ImgUser(this.image).subscribe(
        );
        this.router.navigate(["/auth/user/perfil"]);
       


 }

}
