import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistratiComponent } from './components/registrati/registrati.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { DettagliClienteComponent } from './components/dettagli-cliente/dettagli-cliente.component';
import { DettagliFatturaComponent } from './components/dettagli-fattura/dettagli-fattura.component';
import { FattureClientiComponent } from './components/fatture-clienti/fatture-clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ModificaClienteComponent } from './components/modifica-cliente/modifica-cliente.component';
import { NuovaFatturaComponent } from './components/nuova-fattura/nuova-fattura.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registrati',
    component:RegistratiComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'utenti',
    component: UtentiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clienti',
    component: ClientiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fatture',
    component: FattureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dettagliCliente',
    component: DettagliClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dettagliFattura/:id',
    component: DettagliFatturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fattureCliente/:id',
    component: FattureClientiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'newFattura/:id',
    component: NuovaFatturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modificaCliente/:id',
    component: ModificaClienteComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
