import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import {AutoriComponent} from "./autori/autori.component";
import {AutorDetailComponent} from "./autor-detail/autor-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ZanrRoutingModule} from "../zanr/zanr-routing.module";
import {SharedModule} from "../shared/shared.module";
import {FilterPipe} from "../zanr/zanr-detail/filter.pipe";
import {ZanrModule} from "../zanr/zanr.module";


@NgModule({
  declarations: [
    AutoriComponent,
    AutorDetailComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ZanrRoutingModule,
    SharedModule,
    ZanrModule
  ]
})
export class AutorModule { }
