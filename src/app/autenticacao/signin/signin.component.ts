/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserAuthService } from '../../core/user-auth.service';
import { AlertaDialogLoginServiceComponent } from '../../AlertaDialog/alerta-dialog-login/alerta-dialog-login-service.component';
import { ApiLoginService } from '../services/api-login.service';
import { SigninServiceService } from '../services/signin-service.service';
import { TelaDeLoginComponent } from '../tela-de-login/tela-de-login.component';
import { TelaLoginAuthComponent } from '../tela-login-auth/tela-login-auth.component';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  imports: [MatInputModule, NgxLoadingButtonsModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, TelaLoginAuthComponent, TelaDeLoginComponent]
})
export class SigninComponent {
  desable: boolean = false;
  text: "password" | "text" = 'password';
  icon: "visibility_off" | "visibility" = "visibility";
  msg!: string;
  erro!: string;
  sppiner = false;
  @ViewChild("password") password!: ElementRef;
  @ViewChild("email") email!: ElementRef;

  constructor(public service: SigninServiceService, private router: Router, private http: ApiLoginService, public Logued: UserAuthService, private dialog: MatDialog) { }
  Enviar() {
    if(this.service.Signin.get("password")!.value&&this.service.Signin.get("email")!.value){
      this.sppiner = true;
      this.http.login(this.service.Signin.value).subscribe(e => {
        if (e.token) {
          this.router.navigateByUrl("/");
          this.sppiner = false;
        }
        if (e.msg) {
          this.dialog.open(AlertaDialogLoginServiceComponent, { data: { informacoes: e.msg } });
          this.erro = e.msg;
          this.sppiner = false;
        }
      });
    }else{
      this.sppiner = false;
    }
  }
  Next(event: any): void{
    if(event){
      event.focus();
    }
  }
  registrar() {
    this.router.navigate(["/auth/signup"]);
  }
  esqueceuSenha() {
    this.router.navigate(["/auth/send/email"]);
  }
  mostrar() {
    if (this.desable) {
      this.text = "password";
      this.icon = "visibility";
      this.desable = false;
    } else {
      this.text = "text";
      this.icon = "visibility_off";
      this.desable = true;
    }
  }
}
