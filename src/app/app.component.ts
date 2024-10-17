import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FigureComponent } from './shared/banner/figure/figure.component';
import { RodapeComponent } from './shared/footer/rodape/rodape.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from '../HomePrincipal/Home.component';
import { HeaderComponent } from './Home/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FigureComponent,
    RodapeComponent,
    MatSnackBarModule,
    HomeComponent,
    HeaderComponent
  ],
  providers:[
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:AuthInterceptors,
    //   multi:true
    // },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projetoCd116Frontend';
}
