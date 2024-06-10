/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {  MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LertCardServiceComponent } from '../../../AlertaDialog/AlertCard/LertCard-service.component';
import { AcitiveModule } from '../../../core/activete.module';
import { UserService } from '../../services/user.service';
import { SetorServiceComponent } from '../AddSetor/setor-service.component';
import { MuralComponent } from '../../../components/mural-secundary/mural.component';
import { BotaoBackComponent } from '../../../components/botao_voltar/botaoVoltar.component';

@Component({
  selector: 'app-itens-sistema',
  standalone: true,
  imports: [MuralComponent,BotaoBackComponent,FormsModule, MatButtonModule, MatInputModule,MatFormFieldModule, MatIcon, MatButtonModule, AcitiveModule, ReactiveFormsModule, CommonModule],
  templateUrl: './itens-sistema.component.html',
  styleUrl: './itens-sistema.component.scss'
})
export class ItensSistemaComponent implements AfterViewInit{
  detalheUser!: any;
  img: boolean = false;
  @ViewChild("roleBusca") roleBusca!: ElementRef;
  form = new FormGroup({
    name: new FormControl("")
  });
  constructor(private service: UserService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
 this.roleBusca.nativeElement.focus(); 
 this.roleBusca.nativeElement.placeholder="busque card..";
 }
  Edit() {
    this.matDialog.open(LertCardServiceComponent);
  }
  buscar() {
    if (this.form.get("name")?.value != null) {
      this.service.addCard(this.form.get("name")?.value as any).subscribe(e => {
        if (e.msg) {
          alert(e.msg);
        } else {
          this.detalheUser = e;
          this.service.id = e.id;
        }

      }

      );
    }
  }
  addSetor(){
    this.matDialog.open(SetorServiceComponent);
  }
  delete(event: number){
    alert("id "+event);
  }
}
