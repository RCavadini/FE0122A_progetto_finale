import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Myhttp } from './interceptor/myhttp';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistratiComponent } from './components/registrati/registrati.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DettagliClienteComponent } from './components/dettagli-cliente/dettagli-cliente.component';
import { DettagliFatturaComponent } from './components/dettagli-fattura/dettagli-fattura.component';
import { FattureClientiComponent } from './components/fatture-clienti/fatture-clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ModificaClienteComponent } from './components/modifica-cliente/modifica-cliente.component';
import { NuovaFatturaComponent } from './components/nuova-fattura/nuova-fattura.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistratiComponent,
    UtentiComponent,
    ClientiComponent,
    DettagliClienteComponent,
    DettagliFatturaComponent,
    FattureClientiComponent,
    FattureComponent,
    ModificaClienteComponent,
    NuovaFatturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Myhttp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
