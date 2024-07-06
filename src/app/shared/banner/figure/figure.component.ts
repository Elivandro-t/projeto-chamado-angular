import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from '../../../Home/header/header.component';

@Component({
  selector: 'app-figure',
  standalone: true,
  imports: [MatCardModule,HeaderComponent],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.scss'
})
export class FigureComponent {
  img = "../../../../assets/bn.jpeg";

}
