/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { TelaDeLoginComponent } from "../../tela-de-login/tela-de-login.component";
import { EsqueceuSenhaService } from "../service/EsqueceuSenha.service";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
// import { AlterDialogPasswd } from "../AlertaSenha/alter.passwd.component";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { LoginBnnnerComponent } from "../../../components/shared/banner/login-bnnner/login-bnnner.component";
import { CodigoComponent } from "../codigo/codigo.component";
import { SnackBar } from "../../../AlertaDialog/snackBar/snackbar.component";

@Component({
    selector:"app-emailSend",
    templateUrl:'./emailSend.component.html',
    styleUrl:'./emailSend.component.scss',
    standalone:true,
    imports:[CodigoComponent,LoginBnnnerComponent,CommonModule,MatIcon,MatInputModule,MatButtonModule,TelaDeLoginComponent,MatInputModule,ReactiveFormsModule]
})
export class EmailSendComponent{
  validaCode = false;
  ValidaEmail = false;
  email: any;
    constructor(private snack: SnackBar,private http: EsqueceuSenhaService,private dialog: MatDialog,private router: Router){}
    form=new FormGroup({
        email:new FormControl("",[Validators.required,Validators.email])
      });
    enviar(){
       this.http.Send(this.form.get("email")?.value).subscribe(
        {
        next:(e)=>{
          if(!e.erro){
            this.ValidaEmail = true;
            // this.dialog.open(AlterDialogPasswd,{data:{informacoes:e.msg,email:this.form.get("email")?.value}});
             this.mudaCod();
          }
        }
        }
        
        );
        
    }
    mudaCod(){
      this.email = this.form.get("email")?.value;
      this.validaCode =  true;
    }
}
// alterar/senha/:email