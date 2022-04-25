import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  isLogged: any;

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('utente');
  }

  isLoggedUser(): boolean {
    return localStorage.getItem('utente') !== null;
  }

  Logout() {
    this.authSrv.logout();

  }
}
