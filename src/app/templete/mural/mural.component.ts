import { Component } from '@angular/core';
import { CardsChamadosComponent } from '../../shared/cards/cards-chamados/cards-chamados.component';
import { RodapeComponent } from '../../shared/footer/rodape/rodape.component';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [CardsChamadosComponent,RodapeComponent],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.scss'
})
export class MuralComponent {

}
