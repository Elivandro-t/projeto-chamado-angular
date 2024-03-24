import { ListaUserComponent } from './../../shared/lista-user/lista-user.component';
import { HttpEvent } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { setor, Chamado, ApiResponse, chamadoNew, ChamadoRes, ChamdoId } from './../../core/types';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormService } from '../../service/form.service';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoApiService } from '../../core/chamado-api.service';
import { data } from '../../core/data';
import { CardsChamadosComponent } from '../../shared/cards/cards-chamados/cards-chamados.component';
import { Router } from '@angular/router';
import { MuralComponent } from '../mural/mural.component';
import { MuralPricipalComponent } from '../../mural/mural-pricipal/mural-pricipal.component';
import e from 'express';
@Component({
  selector: 'app-campos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    AsyncPipe, ReactiveFormsModule, MatInputModule,
    FormsModule, FormsModule, MatAutocompleteModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    CardsChamadosComponent,
    MuralComponent,
    MuralPricipalComponent
  ],
  providers: [],
  templateUrl: './campos.component.html',
  styleUrl: './campos.component.scss'
})
export class CamposComponent implements OnInit {

  @Output() data = new EventEmitter()
  myForm: FormGroup;
  dats!: data;
  changeImage = false;
  files!: FileList;
  currentFile: File | null = null;
  filteredOptions!: Observable<setor[]>;
  titule!: number;
  setor!: setor[];
  card!: any;
  chamdoId:any;
  constructor(private service: FormService, private http: ChamadoApiService, private router: Router) {
    this.myForm = service.form;
  }
  ngOnInit() {
    this.filteredOptions = this.myForm.valueChanges.pipe(
      startWith(''),
      map(value =>
        this._filter(value as any)
      )
    )
    //   this.http.pegarSetor().subscribe(e=>{
    //        this.setor = e
    //        console.log(e)
    //  })
    this.http.lista().subscribe(e=>{
      this.chamdoId = e.content.map(e=>e.id)
    })
  }
  private _filter(value: string): setor[] {
    const filterValue = value.toLowerCase();
    const resultado = this.setor.filter(e => e.name.toLowerCase().includes(filterValue))
    return resultado;
  };

  salvar() {
    this.data.emit();
    console.log(this.service.form.value)
    this.http.registrar(this.service.form.value).subscribe(e => {
      console.log(e)
    });
    this.router.navigate(['/cards'])
  }
  onFile() {
    let chamado:any;
   if(this.files!=null){
    for(let i=0;i<this.titule;i++){
      this.currentFile = this.files.item(i);
    }
   }
    this.http.pegarimg(1,this.currentFile, this.service.data()).subscribe((s: any) => {
      if (Array.isArray(s.itens)) {
        s.itens.forEach((e: any) => {
          chamado = e.chamadoid;
        });
      }
      this.router.navigate([`/chamado/${chamado}/${s.id}`])
    })

  }
  uplods(Event: any) {
   
    this.files = Event.target.files;
  
    this.titule = this.files.length
  }

}
