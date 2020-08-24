import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { AlertsService } from '../_services/alerts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alerts: AlertsService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alerts.success('Logged in successfully');
      },
      (error) => {
        this.alerts.error(error);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alerts.message('Logged out');
  }
}
