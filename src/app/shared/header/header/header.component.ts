import { ApiResponse, Chamados } from './../../../core/types';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ChamadoApiService } from '../../../core/chamado-api.service';
import {MatBadgeModule} from '@angular/material/badge'
import { Chamado } from '../../../core/types';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,RouterModule,MatBadgeModule,RouterOutlet,MatIconModule,MatButtonModule,MatChipsModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  titulo!:any;
  constructor(private router:Router,private api:ChamadoApiService){}
  ngOnInit(): void {
   
    this.api.lista().subscribe(e=>{
       
     this.titulo = this.totalItens(e);
       
    })
  }
 navigate(){
  this.router.navigate(['cards'])
 }
 totalItens(element:ApiResponse):any{
  const totalItens = element.content.flatMap((event)=>event.itens)
  return totalItens.length;
 }
}
