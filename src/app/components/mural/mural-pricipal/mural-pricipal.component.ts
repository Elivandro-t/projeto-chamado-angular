import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardsChamadosComponent } from '../../../Home/tela-home/cards/cards-chamados/cards-chamados.component';
import { RodapeComponent } from '../../../shared/footer/rodape/rodape.component';

@Component({
  selector: 'app-mural-pricipal',
  standalone: true,
  imports: [RodapeComponent,CardsChamadosComponent,CommonModule],
  templateUrl: './mural-pricipal.component.html',
  styleUrl: './mural-pricipal.component.scss'
})
export class MuralPricipalComponent {
@Input() variant: "primary"|"secundary"|"list"|"auth" = "primary";
@Input() logo!: string;
}
