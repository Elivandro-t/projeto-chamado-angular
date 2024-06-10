import { Component } from '@angular/core';
import { MuralPricipalComponent } from '../../components/mural/mural-pricipal/mural-pricipal.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MuralPricipalComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

}
