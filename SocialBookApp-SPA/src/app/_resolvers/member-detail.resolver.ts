import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertsService } from '../_services/alerts.service';


@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alerts: AlertsService
  ) {}

  resolve(route: ActivatedRouteSnapshot) : Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError(error => {
        this.alerts.error('Problem retreiving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
