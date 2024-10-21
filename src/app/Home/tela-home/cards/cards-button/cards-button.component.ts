/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { CardsChamadosComponent } from '../cards-chamados/cards-chamados.component';
import { MyButtonsComponent } from '../my-buttons/my-buttons.component';
import { BotoesService } from '../../../../core/botoes.service';
import { CommonModule } from '@angular/common';
import { botoes } from '../../../../core/types';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-cards-button',
  standalone: true,
  imports: [CardsChamadosComponent,MyButtonsComponent,CommonModule,MatCardModule],
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent implements OnInit {
  data: botoes[]=[];
constructor(private service: BotoesService){}
it = [
  {
    name:""
  },
  {
    name:""
  }
];
 loading = false;
  ngOnInit(): void {
    this.service.buscarBotoes().subscribe(e=>{
      this.loading = true;
        this.data=e;
    
    });
  }

}
