import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from './../../models/cliente';
import { FatturaService } from './../../service/fattura.service';

@Component({
  selector: 'app-dettagli-fattura',
  templateUrl: './dettagli-fattura.component.html',
  styleUrls: ['./dettagli-fattura.component.scss']
})
export class DettagliFatturaComponent implements OnInit {
  fattura: any;
  response: any;
  cliente!: Cliente;
  closeResult = '';

  constructor( private fatturaSrv: FatturaService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.caricaDettagli(id);
    });
  }

  caricaDettagli(id: number) {
    this.fatturaSrv.dettagli(id).subscribe((res) => {
      this.fattura = res;
      this.cliente = this.fattura.cliente;
    });
  }

  salva(form: NgForm) {
    this.fattura.stato.id = form.value.stato;
    this.fatturaSrv.modifica(this.fattura).subscribe((res) => {
      this.router.navigate(['/fatture']);
    });
  }

  elimina(id: number) {
    this.fatturaSrv.delete(id).subscribe(() => {
      this.router.navigate(['/fatture']);
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
