import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  
   form = new FormGroup({
    search:new FormControl(null),
    dataAntes:new FormControl(null),
    dataDepois:new FormControl(null)
   });
  constructor() { }
}
