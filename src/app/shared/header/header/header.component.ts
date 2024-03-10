import { Component, Injectable, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ChamadoApiService } from '../../../core/chamado-api.service';
import {MatBadgeModule} from '@angular/material/badge'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,RouterModule,MatBadgeModule,RouterOutlet,MatIconModule,MatButtonModule,MatChipsModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  titulo!:number;
  constructor(private router:Router,private api:ChamadoApiService){}
  ngOnInit(): void {
    this.api.lista().subscribe((e)=>{
         this.titulo = e.totalElements;
         console.log("total"+this.titulo)
    })
  }
 navigate(){
  this.router.navigate(['cards'])
 }
}
