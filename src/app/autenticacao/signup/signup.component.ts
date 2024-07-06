/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 import { MatDialog } from '@angular/material/dialog';
import { ApiLoginService } from '../services/api-login.service';
import { SigninServiceService } from '../services/signin-service.service';
import { TelaDeLoginComponent } from '../tela-de-login/tela-de-login.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AlertaDialogServiceComponent } from '../../AlertaDialog/alerta-dialog-service/alerta-dialog-service.component';
import { MatSelectModule } from '@angular/material/select';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { setor } from '../../core/types';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';
import { AlertComponent } from '../../Home/tela-home/cards/cards-anuncios/alert/alert.component';
import { SnackBar } from '../../AlertaDialog/snackBar/snackbar.component';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatIconModule,AlertComponent, NgxLoadingButtonsModule, AsyncPipe, MatIcon, MatAutocompleteModule, MatInputModule, MatSelectModule, MatButtonModule, TelaDeLoginComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',

})
export class SignupComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('lastnameInput') lastnameInput!: ElementRef;
  @ViewChild('setorInput') setorInput!: ElementRef;
  @ViewChild('filialInput') filialInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('replacepasswordInput') replacepasswordInput!: ElementRef;
  ListaSetor!: setor[];
  desable: boolean = false;
  text: "password" | "text" = 'password';
  icon: "visibility_off" | "visibility" = "visibility";
  erro!: string;
  filteredOptions!: Observable<setor[]> | undefined;
  disabledbutton = false;
  spinnerbotton = false;
  contador = 40;

  constructor(private Snack: SnackBar,private api: ChamadoApiService, public service: SigninServiceService, private http: ApiLoginService, private router: Router, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.filteredOptions = this.service.form.get("setor")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ""))
    );
    this.carregarSetor();
  }
  private _filter(value: string): setor[] {
    const filterValue = value.toLowerCase();

    return this.ListaSetor ? this.ListaSetor.filter(option => option.name.toLowerCase().includes(filterValue)) : [];
  }
  focusNext(nextInput: any): void {
    if (nextInput) {
      nextInput.focus();
  }
    
  }
 // funcao vindo do form
 selecione<T>(name: string) {
  const form = this.service.form.get(name);
  if (!form) {
    throw new Error("nome nao existe");
  }
  return form as FormControl;
}
  dadosUsuario(): any{
    const data: any = {
    name: this.selecione("name").value,
    lastname: this.selecione("lastname").value,
    setor: this.selecione("setor").value,
    filial:this.selecione("filial").value,
    email:this.selecione("email").value.toLowerCase(),
    password:this.selecione("password").value
    };
    return data;
  }
  Enviar() {
    const password = this.service.form.get("password")?.value;
    const confirmSenha = this.service.form.get("replacepassword")?.value;
    if (password != confirmSenha) {
      alert("senhas não conferem");
      this.spinnerbotton = false;
    } else {
      this.http.Signup(this.dadosUsuario()).subscribe(e => {
        if(e.sucess){
           this.Snack.openSnackBar(e.sucess);
          this.disabledbutton = true;
          this.service.form.reset();
          this.spinnerbotton = false;
          this.mudarRota();
        }else{
          this.dialog.open(AlertaDialogServiceComponent, { data: { informacoes: e.msg } });
          this.disabledbutton = false;
          this.spinnerbotton = false;
        }
       
      });
      this.service.Signin.reset();
    }
  }
  teladeLogin() {
    this.disabledbutton = false;
    this.router.navigate(["/auth/login"]);
  }
  mudarRota() {
    const intervalo = setInterval(() => {
      this.contador--;
      if (this.contador === 0) {
        clearInterval(intervalo);
        this.disabledbutton = false;
        this.router.navigate(["/auth/login"]);
      }
    }, 1000);
  }
  registrar() {
    this.router.navigate(["/auth/signup"]);
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
  cancelar() {
    this.service.form.reset();
  }
  voltar() {
    this.router.navigate(["/"]);
  }
  carregarSetor() {
    this.api.pegarSetor().subscribe(e => {
      this.ListaSetor = e;
    });
  }
  
  
}




export class Pessoa{
  private name!: string;
  private age!: number;

  setName(name: string){
    this.name = name;
  }
  getName(){
    return this.name;
  }
}

