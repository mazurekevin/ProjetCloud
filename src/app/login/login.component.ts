import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = false;
  isLoggedIn = false;
  isLoginFailed = false;
  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService) {this.loginForm = new FormGroup(
    {
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)])
    }
  ); }

  ngOnInit(): void {
  }
  showPassword(submitEvent: Event) {
    this.hide = !this.hide;
    submitEvent.preventDefault();
  }

  onSubmit(): void {
    const response = this.loginForm.controls;
    const email = response.email.value;
    const password = response.password.value;

    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(data);
        //this.reloadPage()
      },
      err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
