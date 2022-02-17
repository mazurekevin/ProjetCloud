import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  declarations: [
    AppComponent,
    FormulaireComponent
  ],
providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
