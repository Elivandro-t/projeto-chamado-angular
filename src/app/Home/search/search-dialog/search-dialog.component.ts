/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BotoesService } from '../../../core/botoes.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AcitiveModule } from '../../../core/activete.module';
import { MyButtonsComponent } from '../../tela-home/cards/my-buttons/my-buttons.component';
import { botoes } from '../../../core/types';
import { MatButtonModule } from '@angular/material/button';
import { ItensComponent } from '../../../shared/templete/itens/itens.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [CommonModule,ItensComponent,MatIconModule,MyButtonsComponent,MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,AcitiveModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss'
})
export class SearchDialogComponent implements AfterViewInit{
  @ViewChild('campoBuscaElement') searchBusca!: ElementRef ;
@Input() close= false;
@Output() closes = new EventEmitter();
form = new FormGroup({
  search:new FormControl('')
 });
 exibir: boolean=false;
 data!: botoes[];
 ngAfterViewInit(): void {
  this.searchBusca.nativeElement.focus();
}

constructor(private Service: BotoesService,private http: BotoesService,private navigate: Router){}
router(Event: number,Titulo: any,$index: any,datas: any){
 
    switch($index){
      case 0:
        this.navigate.navigate([`sistema/${Event}/serviços/${datas}/${Titulo}/${$index}`]);
        break;
      case 1:
        this.navigate.navigate([`sistema/${Event}/serviços/${datas}/${Titulo}/${$index}`]);
        break;
        case 2:
          this.navigate.navigate([`sistema/${Event}/serviços/${datas}/${Titulo}/${$index}`]);
          break;
    }
  this.closeButton();
}
  searchs(){
    if(this.form.get("search")?.value===""){
      this.http.buscarBotoesSea("").subscribe(e=>{
        this.data=e;
          
      }); 
    }else{
      this.http.buscarBotoesSea(this.form.get("search")?.value as any).subscribe(e=>{
        this.data=e;
          
      });
    }
  }

closeButton(){
  this.closes.emit();
}
}
