/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-class-suffix */
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,MatIconModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './passwd.component.html',
  styleUrl: './passwd.component.scss'
})
export class AlterDialogPasswd{
image!: File;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private navigator: Router,private act: ActivatedRoute){
  document.body.classList.add("semScroll");
}
 hendleapi(){
  
 }

 router(){
  this.navigator.navigate([`/alterar/senha/${this.data.email}`]);
 }

}
