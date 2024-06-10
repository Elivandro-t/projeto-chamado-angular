import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { TelaDeLoginComponent } from '../tela-de-login/tela-de-login.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlterarService } from './Service/Alterar.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertaDialogPasswd } from './AlertaSenha/alerta.passwd.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BotaoBackComponent } from '../../components/botao_voltar/botaoVoltar.component';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,BotaoBackComponent, MatButtonModule, TelaDeLoginComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.scss'
})
export class AlterarSenhaComponent {
  constructor(private api: AlterarService, private dialog: MatDialog, private router: Router) { }
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    repleceAssword: new FormControl('', [Validators.required])
  });
  exib: boolean = false;
  text: "text" | "password" = "password";
  erro!: string;
  newPassword() {
    if (this.form.get("newPassword")?.value === this.form.get("repleceAssword")?.value) {
      this.api.newPasswd(this.form.get("password")?.value, this.form.get("newPassword")?.value).subscribe(
        e => {
          if (e.msg) {
            this.dialog.open(AlertaDialogPasswd, { data: { informacoes: e.msg } });

            return;
          }
          else {
            this.dialog.open(AlertaDialogPasswd, { data: { informacoes: e.ok } });
            this.router.navigate(["/"]);
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
