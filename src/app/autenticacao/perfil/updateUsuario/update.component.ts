/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SigninServiceService } from '../../services/signin-service.service';
import { ApiLoginService } from '../../services/api-login.service';
import { MatInputModule } from '@angular/material/input';
import { SnackBar } from '../../../AlertaDialog/snackBar/snackbar.component';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatInputModule,
    FormsModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatSelectModule,ReactiveFormsModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent{
  UserUpdate = new FormGroup({
    id: new FormControl(this.data.user.id,Validators.required),
    name: new FormControl(this.data.user.name,Validators.required),
    lastname: new FormControl(this.data.user.lastname,Validators.required),
    contato:new FormControl(this.data.user.contato,Validators.required)
  });
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private snack: SnackBar,public user: SigninServiceService,private endpoint: ApiLoginService){}
 

 hendleapi(){
 this.endpoint.UpdateUser(this.UserUpdate.value).subscribe(e=>{
   if(e.msg){
    this.snack.openSnackBar(e.msg);
   }
  });
  setInterval(()=>{
    window.location.reload();
  },2000);
 
 }
 formatPhone(event: any) {
  const input = event.target;
  const value = input.value.replace(/\D/g, '').substring(0, 11);
  input.value = value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
}

 
}
