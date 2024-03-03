import { Component } from '@angular/core';
import { CardsChamadosComponent } from '../cards-chamados/cards-chamados.component';
import { MyButtonsComponent } from '../my-buttons/my-buttons.component';
@Component({
  selector: 'app-cards-button',
  standalone: true,
  imports: [CardsChamadosComponent,MyButtonsComponent],
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent {

}
