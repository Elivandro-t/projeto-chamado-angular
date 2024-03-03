import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { FigureComponent } from './shared/banner/figure/figure.component';
import { CommonModule } from '@angular/common';
import { CardsChamadosComponent } from './shared/cards/cards-chamados/cards-chamados.component';
import { CardsButtonComponent } from './shared/cards/cards-button/cards-button.component';
import { AlertComponent } from './shared/cards/cards-anuncios/alert/alert.component';
import { TelaHomeComponent } from './Home/tela-home/tela-home.component';
import { RodapeComponent } from './shared/footer/rodape/rodape.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TelaHomeComponent,
    RodapeComponent,
    HeaderComponent,
    FigureComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projetoCd116Frontend';
}
