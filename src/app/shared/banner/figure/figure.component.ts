import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from '../../../Home/header/header.component';
import { UserAuthService } from '../../../core/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-figure',
  standalone: true,
  imports: [MatCardModule,HeaderComponent,CommonModule],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.scss'
})
export class FigureComponent implements AfterViewInit, OnDestroy {
 
  @ViewChild("radio1") radio1!: ElementRef;
  @ViewChild("radio2") radio2!: ElementRef;
  numero = 0; // Começa no primeiro slide
  intervalId!: ReturnType<typeof setInterval>;
  constructor(public Auth: UserAuthService){}

  ngAfterViewInit(): void {
    const mudarImagem = () => {
      this.nextImg();
      this.intervalId = setTimeout(mudarImagem, 20000); // A cada 2 segundos
    };
    mudarImagem();

  }
  nextImg() {
    this.numero++;
    if (this.numero > 2) {
      this.numero = 1;
    }
    const radio = document.getElementById("radio" + this.numero) as HTMLInputElement;
    if (radio) {
      radio.checked = true;
    }
  }

  ngOnDestroy(): void {
   clearInterval(this.intervalId);
  }
  

}
