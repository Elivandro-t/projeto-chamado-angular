import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AcitiveModule } from '../../../core/activete.module';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [MatCardModule,AcitiveModule],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.scss'
})
export class ItensComponent {
@Input() titulo!: string;
@Input() subTitulo!: string;
@Output() navigate = new EventEmitter();
router(){
  this.navigate.emit();
}
}
