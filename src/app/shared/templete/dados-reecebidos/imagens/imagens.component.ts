/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-imagens',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './imagens.component.html',
  styleUrl: './imagens.component.scss'
})
export class ImagensComponent {
  showDownloadButtons: boolean = false;
  showModal: boolean = false;
  @ViewChild("img", { static: true })
  imagemArea!: ElementRef;
  @Input() FotoName!: string;
  @Input() data: any;
  max = 100;
  constructor(private http: HttpClient) { }
  showFullScreen(arg0: any) {
    document.body.classList.add("semScroll");
    this.FotoName = arg0;
    this.showModal = true;
  }
  close() {
    document.body.classList.remove("semScroll");
    this.showModal = false;
  }
   zoom(){
    this.max-=10;
    this.imagemArea.nativeElement.style.width = `${this.max}px`;
    this.imagemArea.nativeElement.style.height = `${this.max}vh`;
   }
  showButtons() {
    document.body.classList.add("semScroll");
    this.showDownloadButtons = true;
   const time = setTimeout(() => {
      this.showDownloadButtons = false;
    }, 10000);
    clearTimeout(time);
  }

  navigar(arg0: string) {
    this.http.get(arg0, { responseType: 'blob' }).subscribe((res: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(res);
      downloadLink.download = 'SomosUmSoCoraçao.jpg';
      downloadLink.click();
    }
    );
  }

}
