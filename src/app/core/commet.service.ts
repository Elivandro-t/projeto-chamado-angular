import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommetService{
  form!: FormGroup;
  
  constructor(private formBuild: FormBuilder){
    this.form = this.formBuild.group({
      comments:[" "]
     });
  }
}
