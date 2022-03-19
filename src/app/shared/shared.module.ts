import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule, FormsModule, RouterModule, ReactiveFormsModule
  ],
  exports: [NavbarComponent, CommonModule]
})
export class SharedModule { }
