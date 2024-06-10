import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SigninServiceService {
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    setor: new FormControl("", Validators.required),
    filial: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(6)]),
    replacepassword: new FormControl("", [Validators.required, Validators.maxLength(12), Validators.minLength(5)])

  });
  UserUpdate = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    contato:new FormControl()
  });
  Signin = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(5)]),

  });
  constructor() { }
}
