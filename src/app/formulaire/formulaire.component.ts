import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, Form} from '@angular/forms';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {

  const emailControl = c.get('email');
  const emailConfirmControl = c.get('confirmEmail');

  if (emailControl?.pristine || emailConfirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value === emailConfirmControl?.value) {
    return null;
  }

  return { match: true };

}
function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {

  const passwordControl = c.get('password');
  const passwordConfirmControl = c.get('confirmPassword');

  if (passwordControl?.pristine || passwordConfirmControl?.pristine) {
    return null;
  }

  if (passwordControl?.value === passwordConfirmControl?.value) {
    return null;
  }

  return { match: true };

}
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})

export class FormulaireComponent implements OnInit {
  registerFormOne: FormGroup;
  registerForm = new FormGroup({
    lastname:new FormControl('',[Validators.required]),
  });

  get lastname(){
    return this.registerForm.get('lastname');
  }

  constructor(private fb: FormBuilder) {
    this.registerFormOne = this.fb.group({
      firstName: ['', [ Validators.required,Validators.minLength(1)]],
      lastName: ['', [Validators.required,Validators.minLength(1)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }, {validators: emailMatcher}),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      }, { validators: passwordMatcher})
    })
  }

  ngOnInit(): void {
  }

}
