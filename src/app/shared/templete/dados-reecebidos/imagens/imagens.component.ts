/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
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
  @Input() FotoName!: string;
  @Input() data: any;
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
