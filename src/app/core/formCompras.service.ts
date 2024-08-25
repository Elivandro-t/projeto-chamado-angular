import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn:"root"
})
export class FormComprasService{
    formCompras = new FormGroup({
        nome:new FormControl("",[Validators.required]),
        setor:new FormControl("",[Validators.required]),
        solicitacao:new FormControl("",[Validators.required]),
        patrimonio:new FormControl(0,[Validators.required]),
        equipamento:new FormControl("",[Validators.required]),
        descricao:new FormControl("",[Validators.required])
    });
}