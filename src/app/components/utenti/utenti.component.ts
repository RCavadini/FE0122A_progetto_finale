import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  utenti!: Array<User>;
  response!: any;
  pagCorr: any;
  numP: any;

  ngOnInit() {
    this.authSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.utenti = this.response.content
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.authSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.utenti = this.response.content;
      this.pagCorr = page;
    });
  }
}
