import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommetService implements OnInit{
  form!:FormGroup;
  constructor(private formBuild:FormBuilder){}
  ngOnInit(): void {
   this.form = this.formBuild.group({
    commet:["dafsad",Validators.required]
   })
  }
}
