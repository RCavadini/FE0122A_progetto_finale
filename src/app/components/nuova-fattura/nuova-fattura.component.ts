import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../../models/cliente';
import { ClienteService } from './../../service/cliente.service';
import { FatturaService } from './../../service/fattura.service';


@Component({
  selector: 'app-nuova-fattura',
  templateUrl: './nuova-fattura.component.html',
  styleUrls: ['./nuova-fattura.component.scss']
})
export class NuovaFatturaComponent implements OnInit {
  constructor( private clientiSrv: ClienteService, private route: ActivatedRoute, private fattureSrv: FatturaService, private router: Router) {}

  id!: number;
  cliente!: Cliente;
  response: any;
  nuovaFattura: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.clientiSrv.getById(this.id).subscribe((res) => {
        this.response = res;
        this.cliente = this.response;
      });
    });
  }

  crea(form: any) {
    this.nuovaFattura = {
      id: 0,
      numero: 0,
      anno: 0,
      importo: 0,
      data: '',
      stato: { id: 0, nome: '' },
      cliente: {},
    };

    this.nuovaFattura.data = form.value.data;
    this.nuovaFattura.anno = this.nuovaFattura.data.slice(0, 4);
    this.nuovaFattura.importo = form.value.importo;
    this.nuovaFattura.numero = form.value.numFatt;
    this.nuovaFattura.stato.id = form.value.stato;
    this.nuovaFattura.cliente.id = this.cliente.id;
    this.fattureSrv.creaFattura(this.nuovaFattura).subscribe();
    this.router.navigate(['/clienti']);
  }
}
