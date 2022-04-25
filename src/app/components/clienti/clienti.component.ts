import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente';
import { ClienteService } from './../../service/cliente.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})

export class ClientiComponent implements OnInit {
  constructor(private clientiSrv: ClienteService, private router: Router, private modalService: NgbModal) {}

  closeResult = '';
  clienti!: Cliente[];
  numP: any;
  response: any;
  idCliente!: number;
  pagCorr: number = 0;

  ngOnInit(): void {
    this.clientiSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.clienti = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.clientiSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.clienti = this.response.content;
      this.pagCorr = page;
    });
  }

  async eliminaCliente(idCliente: number, i: number) {
    this.idCliente = idCliente;
    let id = this.pagCorr * 20 + this.idCliente;
    await this.clientiSrv.deleteFatture(idCliente).toPromise();
    this.clientiSrv.delete(idCliente).subscribe((c) => {
      this.router.navigate(['/clienti']);
      this.clienti.splice(i, 1);
    });
  }

  open(content:any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
