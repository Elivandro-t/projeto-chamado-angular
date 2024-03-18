import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { chamadoNew } from '../core/types';
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
  selecione<T>(name:string){
    const form = this.form.get(name);
    if(!form){
      throw new Error("nome nao exisre")
    }
    return form as FormControl;
  }
  data():chamadoNew{
		const data:chamadoNew = {
      usuario_id:1,
    usuario:this.selecione('usuario').value,
    titulo:this.selecione('titulo').value,
    equipamento:this.selecione('equipamento').value,
    setor:this.selecione('setor').value,
    patrimonio:this.selecione('patrimonio').value,
    solicitacao:this.selecione('solicitacao').value,
    descricao:this.selecione('descricao').value
    }
    return data
  }
}

