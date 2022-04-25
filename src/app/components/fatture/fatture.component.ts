import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FatturaService } from 'src/app/service/fattura.service';
import { Fattura } from 'src/app/models/fattura';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})

export class FattureComponent implements OnInit {
  constructor( private fatturaSrv: FatturaService, private modalService: NgbModal) {}
  fatture!: Array<Fattura>;
  response: any;
  pagCorr: any;
  closeResult="";
  numP: any;

  ngOnInit(): void {
    this.fatturaSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.fatturaSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      this.pagCorr = page;
    });
  }

  elimina(id: number, i: number) {
    this.fatturaSrv.delete(id).subscribe(() => {
      this.fatture.splice(i, 1);
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
