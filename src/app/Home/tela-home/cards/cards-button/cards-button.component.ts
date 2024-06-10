import { Component, OnInit } from '@angular/core';
import { CardsChamadosComponent } from '../cards-chamados/cards-chamados.component';
import { MyButtonsComponent } from '../my-buttons/my-buttons.component';
import { BotoesService } from '../../../../core/botoes.service';
import { CommonModule } from '@angular/common';
import { botoes } from '../../../../core/types';
@Component({
  selector: 'app-cards-button',
  standalone: true,
  imports: [CardsChamadosComponent,MyButtonsComponent,CommonModule],
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent implements OnInit {
  data: botoes[]=[];
constructor(private service: BotoesService){}
  ngOnInit(): void {
    this.service.buscarBotoes().subscribe(e=>{
      this.data=e;
    });
  }

}
