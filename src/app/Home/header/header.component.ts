import { SnackBar } from './../../AlertaDialog/snackBar/snackbar.component';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '../../core/types';
import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../core/user-auth.service';
import { Dialog } from '@angular/cdk/dialog';
import { AcitiveModule } from '../../core/activete.module';
import { SearchDialogComponent } from '../search/search-dialog/search-dialog.component';
import { ApiLoginService } from '../../autenticacao/services/api-login.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    AcitiveModule
    , RouterModule,
    MatBadgeModule,
    RouterOutlet,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    SearchDialogComponent,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() logoName: "SUPORTE TI" | "Tela de Login" = "SUPORTE TI";
  titulo!: any;
  logued: boolean = false;
  user: any;
  img: any;
  desable: boolean = false;
  alertDialog: boolean = false;
  constructor(private snack: SnackBar,private button: ApiLoginService,private router: Router, private api: ChamadoApiService, public Auth: UserAuthService, private dialog: Dialog) { }
  ngOnInit(): void {
    const name = null;
    this.api.lista(name,undefined,true).subscribe((e)=> {
      if(e){
        this.titulo = this.totalItens(e);
      }
      this.logued = this.Auth.isLogout();
      
    });
    this.Auth.retornUser().subscribe((e) => {
     if(e && e.perfil){
      this.user = e.perfil;
     }
     if(e && e.imagem){
      this.img = e.imagem;
     }
     
    });
  }
  chamadoUser(){
    this.router.navigate(['/meuchamado/aceito']);
  }
  navigate() {
    this.router.navigate(['cards']);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totalItens(element: ApiResponse): any {
    const totalItens = element.content.flatMap((event) => event.itens);
    return totalItens.length;
  }
  removeTOken() {
    this.Auth.removeRefreshToken();
    this.Auth.removeToken();
    window.location.reload();
  }
  search() {
    document.body.classList.add("semScroll");
    this.alertDialog = true;
  }
  close() {
    document.body.classList.remove("semScroll");
    this.alertDialog = false;
  }

}
