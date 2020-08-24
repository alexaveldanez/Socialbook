import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AlertsService } from '../_services/alerts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alerts: AlertsService
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alerts.error('You are not authorized!');
    this.router.navigate(['/home']);
    return false;
  }
}
