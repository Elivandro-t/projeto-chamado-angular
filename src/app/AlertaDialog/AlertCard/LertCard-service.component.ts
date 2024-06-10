/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit,Component,ElementRef,ViewChild } from '@angular/core';
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
  templateUrl: './LertCard-service.component.html',
  styleUrl: './LertCard-service.component.scss'
})
export class LertCardServiceComponent implements AfterViewInit{
image!: File;
ima: any;
msg: boolean = false;
@ViewChild("addCard") addButon!: ElementRef;
form = new FormGroup({
  name:new FormControl(""),
  titulo:new FormControl("")
});
foods: any[] = [
  {value: 'admin', viewValue: 'Admin'},
  {value: 'user', viewValue: 'User'},
  {value: 'dev', viewValue: 'dev'},
  {value: 'suporte', viewValue: 'suporte'},
];
constructor(private user: UserService,private router: Router,){}
  ngAfterViewInit(): void {
    this.addButon.nativeElement.focus();
  }

 hendleapi(){

  this.user.addCardBtn(this.user.id,this.datas()).subscribe(e=>{
    alert("msg "+e.msg);
  });
  this.form.reset();
 }

 selecione(name: string){
  const form = this.form.get(name);
  if(!form){
    throw new Error("nome nao existe");
  }
  return form as FormControl;
}
datas(): any{
  const data: any = {
    name: this.selecione('name').value,
    titulo: this.selecione('titulo').value,
  };
  return data;
}
}
