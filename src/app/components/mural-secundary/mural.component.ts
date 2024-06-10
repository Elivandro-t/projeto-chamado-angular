import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardsChamadosComponent } from '../../Home/tela-home/cards/cards-chamados/cards-chamados.component';
import { RodapeComponent } from '../../shared/footer/rodape/rodape.component';
import { CamposComponent } from '../../shared/templete/campos/campos.component';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [RodapeComponent,CardsChamadosComponent,RodapeComponent,CamposComponent,FormsModule,CommonModule],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.scss'
})
export class MuralComponent {
  @Input() variant: "primary"|"secundary" = "primary";

}
