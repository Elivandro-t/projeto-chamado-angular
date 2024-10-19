/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserAuthService } from '../../core/user-auth.service';
import { ApiLoginService } from '../services/api-login.service';
import { SigninServiceService } from '../services/signin-service.service';
import { TelaDeLoginComponent } from '../tela-de-login/tela-de-login.component';
import { TelaLoginAuthComponent } from '../tela-login-auth/tela-login-auth.component';
import { Loading } from '../../loading/Loading';
import { SnackBar } from '../../AlertaDialog/snackBar/snackbar.component';
import { LoginBnnnerComponent } from '../../components/shared/banner/login-bnnner/login-bnnner.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  imports: [LoginBnnnerComponent,MatInputModule,Loading, MatProgressSpinnerModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, TelaLoginAuthComponent, TelaDeLoginComponent]
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

  constructor(private snack: SnackBar,public service: SigninServiceService, private router: Router, private http: ApiLoginService, public Logued: UserAuthService, private dialog: MatDialog) { }
 selecione<T>(name: string){
  const form = this.service.Signin.get(name);
  if (!form) {
    throw new Error("nome nao existe");
  }
  return form as FormControl;
 }
  fazerLogin(): any{
    const data: any = {
      email: this.selecione("email").value.toLowerCase(),
      password:this.selecione("password").value
    };
    return data;
  }
  Enviar() {
    if(this.service.Signin.get("password")!.value&&this.service.Signin.get("email")!.value){
      this.sppiner = true;
      this.http.login(this.fazerLogin()).subscribe(e => {
        if (e.token) {
          this.router.navigateByUrl("/");
          this.sppiner = false;
        }
        if (e.msg) {
          this.snack.openSnackBar(e.msg);
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
  isborda(){
    return this.service.Signin.get('email')?.errors?.['email']&&this.service.Signin.get('email')?.touched;
        
  }
  isRequired(){
    return this.service.Signin.get('email')?.errors?.['required']&&this.service.Signin.get('email')?.touched;
  }
  ispassword(){
    return this.service.Signin.get('password')?.errors?.['required']&&this.service.Signin.get('password')?.touched;
  }
}
