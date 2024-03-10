import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardsChamadosComponent } from '../../shared/cards/cards-chamados/cards-chamados.component';

@Component({
  selector: 'app-mural-pricipal',
  standalone: true,
  imports: [CardsChamadosComponent,CommonModule],
  templateUrl: './mural-pricipal.component.html',
  styleUrl: './mural-pricipal.component.scss'
})
export class MuralPricipalComponent {
@Input() variant:"primary"|"secundary" = "primary"
}
