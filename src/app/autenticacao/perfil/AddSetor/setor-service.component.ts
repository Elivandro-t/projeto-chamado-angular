/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef,ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BotoesService } from '../../../core/botoes.service';
import { BotaoBackComponent } from '../../../components/botao_voltar/botaoVoltar.component';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,BotaoBackComponent,MatDialogTitle,MatIconModule,MatSelectModule,ReactiveFormsModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule,CommonModule],
  templateUrl: './setor-service.component.html',
  styleUrl: './setor-service.component.scss'
})
export class SetorServiceComponent implements AfterViewInit{
image!: File;
ima: any;
msg: boolean = false;
form = new FormGroup({
  name:new FormControl("")
});
@ViewChild("small") Smal!: ElementRef;

@ViewChild("palceholder") Input!: ElementRef;

constructor(private user: BotoesService){}
  ngAfterViewInit(): void {
    this.Input.nativeElement.placeholder="criar setor..";
    this.Smal.nativeElement.style.color="blue";
  }

 hendleapi(){
  const name = this.form.get("name")?.value?.toLocaleUpperCase();
    this.user.addSetor(name).subscribe(e=>{
      alert(e.msg);
    });
    this.form.reset();

 }

}
