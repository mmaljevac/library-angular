import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NaslovnaComponent} from "./naslovna/naslovna.component";
import {ZanroviComponent} from "./zanr/zanrovi/zanrovi.component";
import {AutoriComponent} from "./autor/autori/autori.component";
import {PosudbeComponent} from "./posudbe/posudbe.component";
import {AuthModule} from "./auth/auth.module";
import {ZanrModule} from "./zanr/zanr.module";
import {KorisniciComponent} from "./korisnici/korisnici.component";
import {AutorModule} from "./autor/autor.module";
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  {path: '', component: NaslovnaComponent},
  {path: 'login', loadChildren: () => AuthModule},
  {path: 'register', component: RegisterComponent},
  {path: 'zanrovi', loadChildren: () => ZanrModule},
  {path: 'autori', loadChildren: () => AutorModule},
  {path: 'posudbe', component: PosudbeComponent},
  {path: 'korisnici', component: KorisniciComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
