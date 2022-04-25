import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  item!: any;
  users!: User;


  ngOnInit(): void {
    localStorage.getItem('utente');
  }

  login(form: NgForm) {
    this.item = form.value;
    this.authSrv.login(this.item).subscribe((res) => {
      this.users = res;
      localStorage.setItem('utente', JSON.stringify(this.users));
      this.router.navigate(['/utenti']);
      localStorage.getItem("utente");
    }, rej => {
      alert("Errore nella compilazione dei campi");
    });
  }
}
