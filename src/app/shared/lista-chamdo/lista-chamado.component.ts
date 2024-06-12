/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';
import { UserAuthService } from './../../core/user-auth.service';
import { ChamdoId } from '../../core/types';
import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { BuscaService } from '../../core/busca.service';
import { MatIconModule } from '@angular/material/icon';
import { AcitiveModule } from '../../core/activete.module';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MuralPricipalComponent } from '../../components/mural/mural-pricipal/mural-pricipal.component';
import { SnackBar } from '../../AlertaDialog/snackBar/snackbar.component';
import { LoadingComponent } from '../../components/loading/loading';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BotaoBackComponent } from '../../components/botao_voltar/botaoVoltar.component';
import { PdfService } from '../templete/service/pdf.service';
@Component({
  selector: 'app-lista-chamado',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatPaginatorModule, MuralPricipalComponent, MatProgressSpinnerModule, ReactiveFormsModule, CommonModule,
    MatSelectModule, MatCheckboxModule, MatSelectModule,
    AcitiveModule, BotaoBackComponent,
    MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatPaginatorModule, MenuComponent, LoadingComponent],
  providers: [

  ],
  templateUrl: './lista-chamado.component.html',
  styleUrl: './lista-chamado.component.scss'
})
@Inject('root')
export class ListaChamadoComponent implements OnInit {
  toppings = new FormControl('');
  lista = [
    { "ativo": false, "name": "fechado" },
    { "ativo": true, "name": "aberto" }
  ];
  @Input() desableBotton!: boolean;
  desable: boolean = false;
  totalPages = 0;
  @Output() PegesUpdate = new EventEmitter();
  @Output() Buscar = new EventEmitter();
  @Output() atualizar = new EventEmitter();
  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: any[];
  @Input() number!: number;
  @Input() id!: ChamdoId;
  @Input() exibir: boolean = false;
  disable = false;
  disableNext = false;
  @Output() emitername = new EventEmitter();
  @Output() emitdata = new EventEmitter();
  @Output() emitsize = new EventEmitter();
  @Output() gerarDados = new EventEmitter();
  habilita!: boolean;
  @Input() page: any;
  @Input() itemTotal: any;
  size = 5;
user!: any;
  constructor(private Auth: UserAuthService,private pd: PdfService, private sanitizer: DomSanitizer, private snackBar: SnackBar, private service: ChamadoApiService, public busca: BuscaService, private route: Router, public auth: UserAuthService) { }
  ngOnInit(): void {
    this.Auth.retornUser().subscribe((e)=>{
      this.user = e.perfil;
     }); 
    switch (this.desableBotton) {
      case true:
        this.desable = false;
        break;
      case false:
        this.desable = true;
        break;
      default:
        break;
    }

  }
  sizePage(event: any) {
    this.emitsize.emit(event);
  }
  pegaData() {
    this.emitdata.emit();

  }
  check(event: any) {
    this.habilita = event.target.checked;
    if (this.habilita === false) {
      this.busca.form.reset();
    }
  }
  alertas(event: any) {
    this.emitername.emit(event.target.value);
  }
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  next() {
    this.totalPages += 1;
    this.PegesUpdate.emit(this.totalPages);
    if (this.totalPages >= this.number) {
      this.disableNext = true;
      this.disable = false;
    }

  }
  back() {
    this.disableNext = false;
    this.totalPages -= 1;
    this.PegesUpdate.emit(this.totalPages);
    if (this.totalPages <= 0) {
      this.disable = true;
    }

  }

  gera() {
    this.Buscar.emit();

  }
  getRa(id: number, Idchamado: number) {
    return new Promise((resolve) => {

      resolve(this.atualizar.emit({ id, Idchamado }));
      console.log(id + " " + " "+Idchamado);

    });
  }
  chamadoUser(idChamado: string, Id: number) {
    this.route.navigate([`/chamado/${idChamado}/${Id}`]);

  }
  chamadoAdmin(idChamado: string, Id: number) {
    new Promise<void>((resolve, reject) => {
      this.route.navigate([`/chamado/${idChamado}/${Id}/admin`]).then(() => {
        resolve();
      }).catch(erro => {
        reject(erro);
      });
    });
  }
  onSelectionChange(event: any) {
    alert(event);
  }
  // gerando relatorio
  gerarRelatorio(): void {
    let data = [];

    for (let datas of this.dataSource) {
        if (datas.itens !== undefined && datas.itens !== null) {
            data.push(datas.itens);
            console.log(datas.itens);
        }
    }

    if (data.length > 0) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        this.saveExcelFile(excelBuffer, 'relatorio.xlsx');
    } else {
        console.error('Não há dados para criar o relatório.');
    }
}

private saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName;
    link.click();
}
}
