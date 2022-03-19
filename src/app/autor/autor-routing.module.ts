import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AutoriComponent} from "./autori/autori.component";
import {AutorDetailComponent} from "./autor-detail/autor-detail.component";

const routes: Routes = [
  {path:'', component:AutoriComponent},
  {path:':id', component:AutorDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorRoutingModule { }
