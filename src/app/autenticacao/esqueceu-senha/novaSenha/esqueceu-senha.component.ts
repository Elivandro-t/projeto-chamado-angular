import { BotaoBackComponent } from './../../../components/botao_voltar/botaoVoltar.component';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { TelaDeLoginComponent } from '../../tela-de-login/tela-de-login.component';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { EsqueceuSenhaService } from '../service/EsqueceuSenha.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertaDialogPasswd } from '../../alterar-senha/AlertaSenha/alerta.passwd.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-esqueceu-senha',
  standalone: true,
  imports: [BotaoBackComponent,MatInputModule,MatButtonModule,TelaDeLoginComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.scss'
})
export class EsqueceuSenhaComponent {
  constructor(private api: EsqueceuSenhaService, private dialog: MatDialog, private router: Router) { }
  form = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    repleceAssword: new FormControl('', [Validators.required])
  });
  exib: boolean = false;
  text: "text" | "password" = "password";
  erro!: string;
  newPassword() {
    if (this.form.get("newPassword")?.value === this.form.get("repleceAssword")?.value) {
      this.api.alterPasswd(this.api.email,this.form.get("newPassword")?.value).subscribe(
        e => {
          if (e.msg) {
            this.dialog.open(AlertaDialogPasswd, { data: { informacoes: e.msg } });

            return;
          }
          else {
            this.dialog.open(AlertaDialogPasswd, { data: { informacoes: e.ok } });
            this.form.reset();
          }

        }
      );
    } else {
      alert("senhas não sao iguais");
    }

  }
  enable() {
    if (this.exib == false) {
      this.exib = true;
      this.text = "text";
    } else {
      this.exib = false;
      this.text = "password";
    }

  }

}
// this.http.alterPasswd(this.http.email,)
//alert(this.http.email)