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
    this.FotoName = arg0;
    this.showModal = true;
  }
  close() {
    this.showModal = false;
  }

  showButtons() {
    this.showDownloadButtons = true;
    setTimeout(() => {
      this.showDownloadButtons = false;
    }, 20000);
  }

  navigar(arg0: string) {
    this.http.get(arg0, { responseType: 'blob' }).subscribe((res: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(res);
      downloadLink.download = 'photo.jpg';
      downloadLink.click();
    }
    );
  }

}
