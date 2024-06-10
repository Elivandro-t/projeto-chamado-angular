import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { MuralPricipalComponent } from '../../components/mural/mural-pricipal/mural-pricipal.component';
@Component({
  selector: 'app-tela-de-login',
  standalone: true,
  imports: [MuralPricipalComponent,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './tela-de-login.component.html',
  styleUrl: './tela-de-login.component.scss'
})
export class TelaDeLoginComponent {
@Input() variant: "primary"|"secundary"|"list"="primary";
}
