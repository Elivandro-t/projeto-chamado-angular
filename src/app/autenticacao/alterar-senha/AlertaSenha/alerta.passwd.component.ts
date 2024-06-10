/* eslint-disable @angular-eslint/component-class-suffix */
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
import { Router } from '@angular/router';
import { AcitiveModule } from '../../../core/activete.module';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,MatIconModule,AcitiveModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './alerta.passwd.component.html',
  styleUrl: './alerta.passwd.component.scss'
})
export class AlertaDialogPasswd{
image!: File;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private routess: Router){
  document.body.classList.add("semScroll");
 }
 router(){
  this.routess.navigateByUrl('/');
 }
   
}
