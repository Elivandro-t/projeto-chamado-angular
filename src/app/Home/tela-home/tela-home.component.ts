import { Component } from '@angular/core';
import { CardsButtonComponent } from './cards/cards-button/cards-button.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { FigureComponent } from '../../shared/banner/figure/figure.component';
import { CardsChamadosComponent } from './cards/cards-chamados/cards-chamados.component';
import { AlertComponent } from './cards/cards-anuncios/alert/alert.component';
import { RodapeComponent } from '../../shared/footer/rodape/rodape.component';
import { UserAuthService } from '../../core/user-auth.service';
import { MuralPricipalComponent } from '../../components/mural/mural-pricipal/mural-pricipal.component';
@Component({
  selector: 'app-tela-home',
  standalone: true,
  imports: [
    CardsButtonComponent,
    HeaderComponent,
    CardsChamadosComponent,
    MuralPricipalComponent,
    MatIconModule,
    FigureComponent,
    AlertComponent,
    RodapeComponent,
  ],
  templateUrl: './tela-home.component.html',
  styleUrl: './tela-home.component.scss'
})
export class TelaHomeComponent {
  constructor(public Auth: UserAuthService){}

}
