
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  form = new FormGroup({
    titulo:new FormControl("hardware"),
    setor: new FormControl(null, [Validators.required]),
    usuario: new FormControl(null, [Validators.required]),
    solicitacao: new FormControl(null, [Validators.required]),
    patrimonio: new FormControl(null, [Validators.required]),
    equipamento: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null, [Validators.required]),
    status:new FormControl(false)
  })
  constructor() { }
}
