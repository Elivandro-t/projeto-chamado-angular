/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel-component',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  templateUrl: './excel-component.component.html',
  styleUrl: './excel-component.component.scss'
})
export class ExcelComponentComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  data: any[] | undefined;
  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    };
    reader.readAsBinaryString(file);
  }

  clear(): void {
    this.fileInput!.nativeElement.value = '';
    this.data = [];
  }
}
