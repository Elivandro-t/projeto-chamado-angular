import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header/header.component';
import { FigureComponent } from './shared/banner/figure/figure.component';
import { TelaHomeComponent } from './Home/tela-home/tela-home.component';
import { RodapeComponent } from './shared/footer/rodape/rodape.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TelaHomeComponent,
    RodapeComponent,
    HeaderComponent,
    FigureComponent,
    HttpClientModule
  ],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projetoCd116Frontend';
}
