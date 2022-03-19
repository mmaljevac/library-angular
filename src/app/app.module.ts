import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { PosudbeComponent } from './posudbe/posudbe.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';
import {SharedModule} from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KorisniciComponent } from './korisnici/korisnici.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NaslovnaComponent,
    PosudbeComponent,
    KorisniciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
