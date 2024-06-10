import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { TelaDeLoginComponent } from "../../tela-de-login/tela-de-login.component";
import { EsqueceuSenhaService } from "../service/EsqueceuSenha.service";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { AlterDialogPasswdMSg } from "./msg/passwd.component";

@Component({
    selector:"app-codigo",
    templateUrl:'./codigo.component.html',
    styleUrl:'./codigo.component.scss',
    standalone:true,
    imports:[MatIcon,MatInputModule,MatButtonModule,TelaDeLoginComponent,MatInputModule,ReactiveFormsModule,CommonModule]
})
export class CodigoComponent{
    constructor(private http: EsqueceuSenhaService,private dialog: MatDialog,private router: Router,private act: ActivatedRoute){}
    form=new FormGroup({
        codigo:new FormControl("",[Validators.required])
      });
    enviar(){
        const email=this.act.snapshot.paramMap.get("email");
        this.http.Verificar(email,this.form.get("codigo")?.value).subscribe(
            e=>{
               if(e.msg){
                this.http.salvarEmail(email);
                this.router.navigate([`/auth/esqueceu/senha`]);
               }
            },
            (erro: HttpErrorResponse)=>{
                this.dialog.open(AlterDialogPasswdMSg,{data:{informacoes:erro.error.msg}});
    
            }
        );
    }
}