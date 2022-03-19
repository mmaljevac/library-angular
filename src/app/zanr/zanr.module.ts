import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZanrRoutingModule } from './zanr-routing.module';
import {ZanroviComponent} from "./zanrovi/zanrovi.component";
import {ZanrDetailComponent} from "./zanr-detail/zanr-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {FilterPipe} from "./zanr-detail/filter.pipe";


@NgModule({
  declarations: [
    ZanroviComponent,
    ZanrDetailComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ZanrRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ZanrRoutingModule,
    SharedModule
  ],
  exports: [FilterPipe],
})
export class ZanrModule { }
