import { Router, RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { AcitiveModule } from '../../core/activete.module';
import { UserAuthService } from '../../core/user-auth.service';
import { SnackBar } from '../../AlertaDialog/snackBar/snackbar.component';

@Component({
    selector:"app-menu",
    templateUrl:"./menu.component.html",
    styleUrl:"./menu.component.scss",
    standalone:true,
    imports:[MatMenuModule,MatIcon,MatButtonModule,AcitiveModule,RouterLink]
})
export class MenuComponent implements OnInit{
    @Output() nav = new EventEmitter();
    @Output() navi = new EventEmitter();

    @Input() titulo_1!: string;
    @Input() titulo_2!: string;
    @Input() titulo_3!: string;
    user!: string;
    constructor(private Auth: UserAuthService,private snack: SnackBar,private router: Router){}
    ngOnInit(): void {
        this.Auth.retornUser().subscribe((e)=>{
         this.user = e.perfil;
        }); 
    }
    chamadoUser(){
        this.router.navigate(["/meuchamado/aceito"]);
    }
    navigate(){
        this.nav.emit();
    }
    navs(){
        this.navi.emit();

    }

}