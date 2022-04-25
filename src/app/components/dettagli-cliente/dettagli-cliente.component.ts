import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { ClienteService } from 'src/app/service/cliente.service';
import { ComuniProvinceService } from 'src/app/service/comuni-province.service';
import { DettagliClienteService } from 'src/app/service/dettagli-cliente.service';

@Component({
  selector: 'app-dettagli-cliente',
  templateUrl: './dettagli-cliente.component.html',
  styleUrls: ['./dettagli-cliente.component.scss']
})
export class DettagliClienteComponent implements OnInit {
  constructor( private dettClienteSrv: DettagliClienteService, private comProvSrv: ComuniProvinceService, private router: Router, private clientSrv: ClienteService) {}

  tipiClienti: any;
  comuni: Comune[] = [];
  province: Provincia[] = [];
  response: any;
  idProvincia: any;
  provincia1!: string;
  provincia2!: string;
  filterComuni: Comune[] = [];

  newCliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.dettClienteSrv.getTipiCliente().subscribe((c) => {
      this.tipiClienti = c;
    });
    this.comProvSrv.getAllProvince(0).subscribe((c) => {
      this.response = c;
      this.province = this.response.content;
    });
    this.comProvSrv.getAllComuni(0).subscribe((c) => {
      this.response = c;
      this.comuni = this.response.content;
    });
  }
  cambioCitta1(event: any) {
    this.idProvincia = event.target.value;
    let filterComuni: Array<any> = [];
    this.comuni.filter((comune) => {
      if (this.idProvincia == comune.provincia.id) {
        filterComuni.push(comune);
      }
    });
    this.filterComuni = filterComuni;
  }

  addCliente(newCliente: Cliente) {
    this.clientSrv.createCliente(newCliente).subscribe((res) => {
      this.router.navigate(['/clienti']);
    });
  }
}
