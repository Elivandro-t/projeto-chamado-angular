/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { TelaDeLoginComponent } from "../../tela-de-login/tela-de-login.component";
import { EsqueceuSenhaService } from "../service/EsqueceuSenha.service";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { SnackBar } from "../../../AlertaDialog/snackBar/snackbar.component";
import { LoginBnnnerComponent } from "../../../components/shared/banner/login-bnnner/login-bnnner.component";
import { EsqueceuSenhaComponent } from "../novaSenha/esqueceu-senha.component";

@Component({
    selector:"app-codigo",
    templateUrl:'./codigo.component.html',
    styleUrl:'./codigo.component.scss',
    standalone:true,
    imports:[EsqueceuSenhaComponent,LoginBnnnerComponent,MatIcon,MatInputModule,MatButtonModule,TelaDeLoginComponent,MatInputModule,ReactiveFormsModule,CommonModule]
})
export class CodigoComponent{
    @Input() email: any;
    validaCodigo = true;
    alteraSenha = false;
    constructor(private snack: SnackBar,private http: EsqueceuSenhaService,private dialog: MatDialog,private router: Router,private act: ActivatedRoute){}
    form=new FormGroup({
        codigo:new FormControl("",[Validators.required])
      });
    enviar(){
        this.validaCodigo = true;
        // const email=this.act.snapshot.paramMap.get("email");
        this.http.Verificar(this.email,this.form.get("codigo")?.value).subscribe(
            e=>{
               if(e.sucess){
                this.snack.openSnackBar(e.sucess);
                this.http.salvarEmail(this.email);
                // this.router.navigate([`/auth/esqueceu/senha`]);
                this.alterarSenha();
                this.validaCodigo =  false;
                
               }else{
                this.snack.openSnackBar(e.msg);
                this.validaCodigo = true;
               }

            }// this.snack.openSnackBar(erro.error.msg);
             
          
              
    
        );
    }
    alterarSenha(){
        this.alteraSenha = true;
    }
}