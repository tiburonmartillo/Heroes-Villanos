import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/cards/cards.component';
import { SearchComponent } from './components/search/search.component';
import { DetallesComponent } from './components/detalles/detalles.component';

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';

import { Routes, RouterModule } from "@angular/router";
import { appRouting } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    SearchComponent,
    DetallesComponent,
    NavbarComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
