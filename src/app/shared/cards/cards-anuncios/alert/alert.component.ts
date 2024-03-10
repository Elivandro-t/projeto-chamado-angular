import { Component } from '@angular/core';
import { CardsChamadosComponent } from '../../cards-chamados/cards-chamados.component';
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CardsChamadosComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

}
