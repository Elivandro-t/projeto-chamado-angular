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
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,MatIconModule,MatSelectModule,ReactiveFormsModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule,CommonModule],
  templateUrl: './role-service.component.html',
  styleUrl: './role-service.component.scss'
})
export class RoleServiceComponent{
image!: File;
ima: any;
msg: boolean = false;
form = new FormGroup({
  option:new FormControl("")
});

foods: any[] = [
  {value: 'admin', viewValue: 'Admin'},
  {value: 'user', viewValue: 'User'},
  {value: 'dev', viewValue: 'dev'},
  {value: 'suporte', viewValue: 'suporte'},
];
constructor(private user: UserService,private router: Router,){}

 hendleapi(){
    this.user.addPerfil(this.user.email,this.form.get("option")?.value).subscribe(e=>{
      alert(e.msg);
      console.log(e.msg);
    });

 }

}
