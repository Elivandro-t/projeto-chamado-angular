import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../../core/user-auth.service';

@Component({
  selector: 'app-my-buttons',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './my-buttons.component.html',
  styleUrl: './my-buttons.component.scss'
})
export class MyButtonsComponent {
@Input() title: string = '';
@Input() subtitle: string = '';
@Input() src: string = '';
@Input() rotas: string = '';
constructor(private router: Router, public Auth: UserAuthService){}
navegar(){
  if(this.Auth.isLogout()){
    this.router.navigate([this.rotas]);
  }else{
    this.router.navigate(["/auth/login"]);
  }
}
}
