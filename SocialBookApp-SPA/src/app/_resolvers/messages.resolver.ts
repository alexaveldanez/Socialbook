import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { AlertsService } from '../_services/alerts.service';
import { AuthService } from '../_services/auth.service';
import { Message } from '../_models/Message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alerts: AlertsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .pipe(
        catchError((error) => {
          this.alerts.error('Problem retreiving messages');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
