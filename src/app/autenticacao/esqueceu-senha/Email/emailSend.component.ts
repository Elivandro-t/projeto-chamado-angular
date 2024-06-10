/* eslint-disable @angular-eslint/component-selector */
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { TelaDeLoginComponent } from "../../tela-de-login/tela-de-login.component";
import { EsqueceuSenhaService } from "../service/EsqueceuSenha.service";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AlterDialogPasswd } from "../AlertaSenha/alter.passwd.component";
import { HttpErrorResponse } from "@angular/common/http";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { AlterDialogPasswdMSg } from "../codigo/msg/passwd.component";

@Component({
    selector:"app-emailSend",
    templateUrl:'./emailSend.component.html',
    styleUrl:'./emailSend.component.scss',
    standalone:true,
    imports:[CommonModule,MatIcon,MatInputModule,MatButtonModule,TelaDeLoginComponent,MatInputModule,ReactiveFormsModule]
})
export class EmailSendComponent{
    constructor(private http: EsqueceuSenhaService,private dialog: MatDialog,private router: Router){}
    form=new FormGroup({
        email:new FormControl("",[Validators.required,Validators.email])
      });
    enviar(){
        this.http.Send(this.form.get("email")?.value).subscribe((e)=>{
          if(!e.erro){
            this.dialog.open(AlterDialogPasswd,{data:{informacoes:e.msg,email:this.form.get("email")?.value}});

          }
        },(erro: HttpErrorResponse)=>{
            this.dialog.open(AlterDialogPasswdMSg,{data:{informacoes:erro.error.msg}});

        }
        
        );
        
    }
}
// alterar/senha/:email