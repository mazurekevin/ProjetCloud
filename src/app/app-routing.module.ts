import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'
import {FormulaireComponent} from "./formulaire/formulaire.component";
import {LoginComponent} from "./login/login.component";
import {MenuComponent} from "./menu/menu.component";

const routes: Routes = [
  {path: 'Menu',component: MenuComponent},
  {path: 'Connexion',component: LoginComponent},
  {path: 'Inscription',component:FormulaireComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
