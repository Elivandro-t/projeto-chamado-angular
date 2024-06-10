/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { CardsChamadosComponent } from '../../cards-chamados/cards-chamados.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserAuthService } from '../../../../../core/user-auth.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CardsChamadosComponent,MatExpansionModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  panelOpenState = false;
  @Input() titulo="";
  @Input() subtitulo="";
  @Input() body="";
  @Input() username!: any;
  @Input() aviso!: any;
  @Input() saudacao!: any;


  constructor(public Auth: UserAuthService){}
}
