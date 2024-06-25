/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {jsPDF} from "jspdf";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../../components/loading/loading';

@Component({
  selector: 'app-alerta-dialog-service',
  standalone: true,
  imports: [MatDialogModule,MatDialogTitle,CommonModule,LoadingComponent,MatIconModule,MatSelectModule,ReactiveFormsModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule,CommonModule],
  templateUrl: './Relatoriopdf.component.html',
  styleUrl: './Relatoriopdf.component.scss'
})
export class RelatoriopdfComponent{
  displayedColumns = ['Cards', 'Ref', 'Status', 'Setores', 'Solicitantes', 'Data', 'Assis tec'];
  @ViewChild("el",{static:false}) el!: ElementRef;
  @ViewChild('el') printSection!: ElementRef;

 constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  HendlePdf(event: any) {
    const SelectValue = event.target.value;
    if(SelectValue==="pdf"){
      const down  = confirm("deseja realmente baixar?");
      if(down===true){
        this.gerarPDF();
      }
    }
    else if(SelectValue==="csv"){
      this.downloadCsv(this.data.informacoes);
    }
  }

 
  gerarPDF(){
    var doc = new jsPDF('p','pt','a4');
    doc.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("Relatoria_chamados_informatica.pdf");
      }
    });
  }

  downloadCsv(data: any[]) {
    // Ensure data is an array of objects with 'items' arrays
    if (!Array.isArray(data) || !data.every(row => typeof row === 'object' && Array.isArray(row.items))) {
      return;
    }
    // Extract headers for CSV
    const headers = ['ID', 'Name', 'Item ID', 'Item Name', 'Item Price'];

    // Prepare CSV content
    let csvContent = headers.join(',') + '\n';

    data.forEach(row => {
      row.items.forEach((item: any) => {
        const rowData = [
          row.id,
          row.name,
          item.id,
          item.name,
          item.price
        ];
        csvContent += rowData.join(',') + '\n';
      });
    });

    // Create Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'items.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
 convertUpper(event: any){
  if(typeof event === 'string'){
    return event.toUpperCase();
  }
 return "- - -";
 }


 print() {
  const printContents = this.printSection.nativeElement.innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
}
}
