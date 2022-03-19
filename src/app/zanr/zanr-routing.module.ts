import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ZanroviComponent} from "./zanrovi/zanrovi.component";
import {ZanrDetailComponent} from "./zanr-detail/zanr-detail.component";

const routes: Routes = [
  {path:'',component:ZanroviComponent},
  {path:':id',component:ZanrDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZanrRoutingModule { }
