/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,MatIconModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './alerta-dialog-login-service.component.html',
  styleUrl: './alerta-dialog-login-service.component.scss'
})
export class AlertaDialogLoginServiceComponent{
image!: File;
constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
 hendle(event: any){
  const TargetImg = event.target as HTMLInputElement;
  if(TargetImg.files&&TargetImg.files.length>0){
    this.image=TargetImg.files[0];
  }
 }
 hendleapi(){
  alert("foto enviada");
 }

}
