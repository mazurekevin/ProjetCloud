import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [
    AppComponent,
    FormulaireComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
