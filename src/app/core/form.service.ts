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
  formAcess = new FormGroup({
    usuario: new FormControl(null, [Validators.required]),
    setor: new FormControl(null, [Validators.required]),
    gmid:new FormControl(null,[Validators.required]),//pego
    cpf:new FormControl(null,[Validators.required]),
    dataAdmin:new FormControl(null,[Validators.required]),
    dataNasc:new FormControl(null,[Validators.required]),
    filial: new FormControl(null,[Validators.maxLength(4),Validators.pattern('^[0-9]*$')]),
    funcao: new FormControl(null,[Validators.required]),
    descricao: new FormControl(null),
    nomeMae:new FormControl(null,[Validators.required])
  });
  formControl = new FormGroup({
    usuario: new FormControl(null, [Validators.required]),
    setor: new FormControl(null, [Validators.required]),
    gmid:new FormControl(null,[Validators.required]),//pego
    emailUsuario:new FormControl(null,[Validators.required,Validators.email]),
    cpf:new FormControl(null,[Validators.required]),
    centroDeCusto:new FormControl(null,[Validators.required,Validators.pattern('^[0-9.-]*$'),Validators.minLength(4),Validators.maxLength(16)]),
    filial: new FormControl(null,[Validators.maxLength(4),Validators.pattern('^[0-9]*$')]),
    funcao: new FormControl(null,[Validators.required]),
    nomeDogestor:new FormControl(null,[Validators.required]),
    emailGestorAprovador:new FormControl(null,[Validators.required,Validators.email]),
    descricao:new FormControl(null)

  });
  formAddUsuario = new FormGroup({
    usuario: new FormControl(null, [Validators.required]),
    setor: new FormControl(null, [Validators.required]),
    gmid:new FormControl(null,[Validators.required]),//pego
    cpf:new FormControl(null,[Validators.required]),
    filial: new FormControl(null,[Validators.maxLength(3),Validators.pattern('^[0-9]*$')]),
    funcao: new FormControl(null,[Validators.required]),
    descricao: new FormControl(null,[Validators.required]),

  });
}  
