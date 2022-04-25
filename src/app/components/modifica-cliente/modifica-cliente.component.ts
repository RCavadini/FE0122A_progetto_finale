import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../../models/cliente';
import { Comune } from './../../models/comune';
import { Provincia } from './../../models/provincia';
import { ClienteService } from './../../service/cliente.service';
import { ComuniProvinceService } from './../../service/comuni-province.service';
import { DettagliClienteService } from './../../service/dettagli-cliente.service';


@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.scss']
})
export class ModificaClienteComponent implements OnInit {
  constructor( private dettClienteSrv: DettagliClienteService, private comProvSrv: ComuniProvinceService, private router: Router, private route: ActivatedRoute, private clientSrv: ClienteService) {}

  tipiClienti: any;
  comuni!: Comune[];
  province!: Provincia[];
  response: any;
  idCliente: any
  cliente!:Cliente

  newCliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.dettClienteSrv.getTipiCliente().subscribe((Dclienti) => {
      this.tipiClienti = Dclienti;
    });
    this.comProvSrv.getAllProvince(0).subscribe((province) => {
      this.response = province;
      this.province = this.response.content;
      console.log(this.province)
    });
    this.comProvSrv.getAllComuni(0).subscribe((comuni) => {
      this.response = comuni;
      this.comuni = this.response.content;
    });
    this.route.params.subscribe((params) => {
      this.idCliente = +params['id'];
    })
    this.clientSrv.getById(this.idCliente).subscribe((clienti) => {
      this.response = clienti;
      this.cliente = this.response;
      this.newCliente = this.cliente
    })
  }

  modificaCliente(newCliente: Cliente) {
    this.clientSrv.modifica(newCliente).subscribe(res => {
      this.router.navigate(['/clienti']);
    })
  }
}
