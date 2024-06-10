import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  form = new FormGroup({
    sistem_erro:new FormControl(null),
    erro:new FormControl(null),
    setor: new FormControl(null, [Validators.required]),
    usuario: new FormControl(null, [Validators.required]),
    solicitacao: new FormControl(null, [Validators.required]),
    tipoErro:new FormControl(null),
    patrimonio: new FormControl(null,[Validators.maxLength(6),Validators.pattern('^[0-9]*$')]),
    equipamento: new FormControl(null),
    descricao: new FormControl(null, [Validators.required]),
    status:new FormControl(false)
  });
  constructor() { }
}

