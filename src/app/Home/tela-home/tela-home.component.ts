import { Component } from '@angular/core';
import { CardsButtonComponent } from '../../shared/cards/cards-button/cards-button.component';
import { HeaderComponent } from '../../shared/header/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { FigureComponent } from '../../shared/banner/figure/figure.component';
import { CardsChamadosComponent } from '../../shared/cards/cards-chamados/cards-chamados.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../shared/cards/cards-anuncios/alert/alert.component';
import { RodapeComponent } from '../../shared/footer/rodape/rodape.component';

@Component({
  selector: 'app-tela-home',
  standalone: true,
  imports: [
    CardsButtonComponent,
    HeaderComponent,
    CardsChamadosComponent,
    MatIconModule,
    FigureComponent,
    CommonModule,
    AlertComponent,
    RodapeComponent
  ],
  templateUrl: './tela-home.component.html',
  styleUrl: './tela-home.component.scss'
})
export class TelaHomeComponent {

}
