/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, Input } from '@angular/core';
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
  templateUrl: './alerta-dialog-service.component.html',
  styleUrl: './alerta-dialog-service.component.scss'
})
export class AlertaDialogServiceComponent {
 
@Input() api="";
constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

}
