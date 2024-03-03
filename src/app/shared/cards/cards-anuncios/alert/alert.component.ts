import { Component } from '@angular/core';
import { CardsChamadosComponent } from '../../cards-chamados/cards-chamados.component';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CardsChamadosComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

}
