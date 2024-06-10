import { AcitiveModule } from './../../../core/activete.module';
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { SnackBar } from "../../../AlertaDialog/snackBar/snackbar.component";
import { UserAuthService } from "../../../core/user-auth.service";
import { Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';



@Component({
    selector:"app-menuDrop",
    standalone:true,
    imports:[AcitiveModule,MatMenuModule,MatButtonModule,MatIcon,RouterLink],
    templateUrl:"./menuDrop.component.html",
    styleUrl:"./menuDrop.component.scss"
})
export class MenuDropComponent implements OnInit{ 
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