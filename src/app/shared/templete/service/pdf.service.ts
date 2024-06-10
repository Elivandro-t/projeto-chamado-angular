/* eslint-disable prefer-const */
import { Injectable } from "@angular/core";
import jsPDF from 'jspdf';

@Injectable({
    providedIn:"root"
})
export class PdfService{
    gerarPDF() {
        let documento = new jsPDF();
        documento.setFont("Courier");
        documento.setFontSize(20);
        documento.text("Ficha do produto", 65, 15);
      
        documento.setFillColor(50,50,50);
        documento.rect(10, 20, 30, 8, "FD");
        documento.rect(10, 28, 30, 8, "FD");
        documento.rect(10, 36, 30, 8, "FD");
        documento.rect(40, 20, 160, 8, "s");
        documento.rect(40, 28, 160, 8, "s");
        documento.rect(40, 36, 160, 8, "s");
      
        documento.setFontSize(12);
        documento.setTextColor(255, 255, 255);
        documento.text("Código", 12, 25);
        documento.text("Nome", 12, 33);
        documento.text("Preço", 12, 41);
      
        documento.setTextColor(0, 0, 0);
        documento.text("001", 42, 25);
        documento.text("Notebook 14' i7 8GB 1TB", 42, 33);
        documento.text("R$ 2400,00", 42, 41);
      
        documento.output("dataurlnewwindow");
        documento.save('relatorio.pdf');
      }
}