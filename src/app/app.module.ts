import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatStepperModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatListModule,
    BrowserAnimationsModule

  ],
  declarations: [
    AppComponent,
    FormulaireComponent,
    LoginComponent
  ],
providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
