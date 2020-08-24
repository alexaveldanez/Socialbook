
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { AlertsService } from '../_services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alerts: AlertsService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alerts.success('Registration successful!');
    }, error => {
      this.alerts.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
