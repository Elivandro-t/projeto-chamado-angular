/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ApiLoginService } from "../../autenticacao/services/api-login.service";
import { Router } from "@angular/router";
import { UserAuthService } from "../../core/user-auth.service";

@Component({
    selector:"app-confirm",
    standalone:true,
    imports: [MatDialogModule,MatDialogTitle,MatIconModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    templateUrl:"./Confirm.component.html",
    styleUrl:"./Confirm.component.scss"
})
export class ConfirmComponent implements OnInit{
    ativo?: boolean;
     userName?: any;
    constructor(private authApi: ApiLoginService,private router: Router,private auth: UserAuthService ){
       
    }
    ngOnInit(): void {
        this.userName = this.auth.getname();
    }

    Confirmar(){
        this.ativo = true;
        this.ativar(this.ativo);
        this.router.navigate(["/"]);
    }
    cancelar(){
        this.ativo = false;
        this.auth.removeRefreshToken();
        this.auth.removeToken();
        this.auth.getimageRemuve();
        window.location.reload();
        this.ativar(this.ativo);
      

    }

    ativar(alert: boolean){
        this.authApi.$refreshtoken.next(alert);
    }
  
}