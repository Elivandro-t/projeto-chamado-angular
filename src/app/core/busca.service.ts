import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  
   form = new FormGroup({
    search:new FormControl("")
   })
  

  constructor() { }
}
