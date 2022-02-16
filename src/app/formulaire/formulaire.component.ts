import { Component, Injector, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, Form} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  
  public registerFormOne: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerFormOne = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }, {validators: emailMatcher}),
      //login: ['', [Validators.required, Validators.minLength(1)]], 
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      }, { validators: passwordMatcher})
    });
  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    const response = this.registerFormOne.controls;
    const firstname = response.firstName.value;
    const lastname = response.lastName.value;
    const email = response.emailGroup.get('email')?.value;
    const password = response.passwordGroup.get('password')?.value;

    if(this.registerFormOne.status == "VALID")
    this.authService.register(firstname, lastname, email, password).subscribe(
      data => {
        console.log(this.registerFormOne);
      },
      err => {
        console.log("error");
      }
    );
  }

}
