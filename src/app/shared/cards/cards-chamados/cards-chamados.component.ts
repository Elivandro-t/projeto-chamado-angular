import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-cards-chamados',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './cards-chamados.component.html',
  styleUrl: './cards-chamados.component.scss'
})
export class CardsChamadosComponent {

}
