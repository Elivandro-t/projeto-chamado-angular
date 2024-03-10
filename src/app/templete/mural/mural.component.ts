import { Component } from '@angular/core';
import { CardsChamadosComponent } from '../../shared/cards/cards-chamados/cards-chamados.component';
import { RodapeComponent } from '../../shared/footer/rodape/rodape.component';
import { CamposComponent } from '../campos/campos.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [CardsChamadosComponent,RodapeComponent,CamposComponent,FormsModule],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.scss'
})
export class MuralComponent {

}
