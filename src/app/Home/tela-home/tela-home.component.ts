/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CardsButtonComponent } from './cards/cards-button/cards-button.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { FigureComponent } from '../../shared/banner/figure/figure.component';
import { CardsChamadosComponent } from './cards/cards-chamados/cards-chamados.component';
import { AlertComponent } from './cards/cards-anuncios/alert/alert.component';
import { RodapeComponent } from '../../shared/footer/rodape/rodape.component';
import { UserAuthService } from '../../core/user-auth.service';
import { MuralPricipalComponent } from '../../components/mural/mural-pricipal/mural-pricipal.component';
import { UpdateComponent } from '../../autenticacao/perfil/updateUsuario/update.component';
import { UserService } from '../../autenticacao/services/user.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-tela-home',
  standalone: true,
  imports: [
    CardsButtonComponent,
    HeaderComponent,
    CardsChamadosComponent,
    MuralPricipalComponent,
    MatIconModule,
    FigureComponent,
    AlertComponent,
    RodapeComponent,
    UpdateComponent
  ],
  templateUrl: './tela-home.component.html',
  styleUrl: './tela-home.component.scss'
})
export class TelaHomeComponent implements OnInit{
  user?: any;
  constructor(private dialog: MatDialog,private service: UserService,public Auth: UserAuthService){}
  ngOnInit(): void {
    this.service.detalheUser().subscribe(e=>{
      this.user = e;
      if(this.user.contato===null || this.user.contato==="" || this.user.contato===undefined){
        this.dialog.open(UpdateComponent,{data:{user:this.user,titulo:"Atualize seu contato"}});
       }
     
    });
  }



  

}
